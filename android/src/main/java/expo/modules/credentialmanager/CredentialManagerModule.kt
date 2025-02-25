package expo.modules.credentialmanager

import android.content.Context
import androidx.credentials.CreatePasswordRequest
import androidx.credentials.CreatePasswordResponse
import androidx.credentials.CreatePublicKeyCredentialRequest
import androidx.credentials.CreatePublicKeyCredentialResponse
import androidx.credentials.CredentialManager
import androidx.credentials.CredentialOption
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetCredentialResponse
import androidx.credentials.GetPasswordOption
import androidx.credentials.GetPublicKeyCredentialOption
import androidx.credentials.PasswordCredential
import androidx.credentials.PublicKeyCredential
import androidx.credentials.exceptions.CreateCredentialException
import androidx.credentials.exceptions.GetCredentialException
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.runBlocking
import kotlin.io.path.createTempDirectory

class CredentialManagerModule : Module() {

    val gson: Gson = GsonBuilder()
        .registerTypeAdapter(LoginProvider::class.java, LoginMethodDeserializer())
        .create()

    override fun definition() = ModuleDefinition {
        Name("CredentialManager")

        Function("saveUsernameAndPassword") { username: String, password: String, ->
            val result: CreateResponse
            runBlocking {
                result = saveUsernameAndPassword(username, password)
            }
            return@Function gson.toJson(result)
        }

        Function("createPassKey") { request: String ->
            val result: CreateResponse
            runBlocking {
                result = createPassKey(request)
            }
            return@Function gson.toJson(result)
        }

        Function("_login") { values: String ->
            val loginProviders = mutableListOf<CredentialOption>()
            parseLoginProviders(values).forEach { loginProvider ->
                loginProviders.add(getLoginProvider(loginProvider))
            }
            var result: LoginResponse? = null
            runBlocking {
                result = intitiateLogin(GetCredentialRequest(loginProviders))
            }
            return@Function gson.toJson(result)
        }

        Function("prefetchCredentials") { values: String ->
            val loginProviders = mutableListOf<CredentialOption>()
            parseLoginProviders(values).forEach { loginProvider ->
                loginProviders.add(getLoginProvider(loginProvider))
            }
            runBlocking {
                prefetchCredentials(GetCredentialRequest(loginProviders))
            }
        }

    }

    private fun parseLoginProviders(input: String): List<LoginProvider> {
        val listType = object : TypeToken<List<LoginProvider>>() {}.type
        return gson.fromJson(input, listType)
    }

    private fun getLoginProvider(provider: LoginProvider): CredentialOption {
        if (provider.name == "UsernamePassword") {
            // recast the login method into the correct type
            val method = provider as UsernamePasswordLoginProvider
            return GetPasswordOption(
                allowedUserIds = method.options.allowedUserIds.toSet(),
                isAutoSelectAllowed = method.options.autoSelect
            )
        } else if (provider.name == "Google") {
            val method = provider as GoogleLoginProvider
            return GetGoogleIdOption.Builder()
                .setAutoSelectEnabled(method.options.autoSelect)
                .setRequestVerifiedPhoneNumber(method.options.requireVerifiedPhoneNumber)
                .setServerClientId(method.options.serverClientId)
                .setNonce(method.options.nonce)
                .setFilterByAuthorizedAccounts(method.options.authorizedAccountsOnly)
                .build()}
            else if (provider.name == "GoogleButton") {
                val method = provider as GoogleButtonLoginProvider
                val builder = GetSignInWithGoogleOption.Builder(method.options.serverClientId)
                    .setNonce(method.options.nonce)
                if (!method.options.domainFilter.isNullOrEmpty()) {
                    builder.setHostedDomainFilter(method.options.domainFilter)
                }

                return builder.build()
            }
        else if (provider.name == "PassKey") {
            val method = provider as PassKeyLoginProvider
            return GetPublicKeyCredentialOption(
                requestJson = """
                    {
                        "challenge" : ${method.options.challenge},
                        "timeout" : ${method.options.timeout},
                        "rpId" : ${method.options.rpId},
                        "userVerification" : ${method.options.userVerification}
                    }
                """.trimIndent()
            )
        }
        throw IllegalArgumentException("Unknown login method: ${provider.name}")
    }

    private suspend fun saveUsernameAndPassword(username: String, password: String): CreateResponse {
        val context = appContext.activityProvider?.currentActivity!! as Context
        val createPasswordRequest = CreatePasswordRequest(id = username, password = password)
        val credentialManager = CredentialManager.create(context)
        try {
            credentialManager.createCredential(
                context, createPasswordRequest
            ) as CreatePasswordResponse
            return UsernamePasswordResponse(username = username, password=password)
        } catch (e: CreateCredentialException) {
            return handleCreateErrors(e)
        }

    }


    private suspend fun createPassKey(request: String): CreateResponse {
        // Creates a passkey credential
        val context = appContext.activityProvider?.currentActivity!! as Context
        val createPasskeyRequest  = CreatePublicKeyCredentialRequest(
            requestJson = request
        )
        val credentialManager = CredentialManager.create(context)
        try {
            credentialManager.createCredential(
                context = context,
                request = createPasskeyRequest,
            ) as CreatePublicKeyCredentialResponse
            return PasskeyResponse(requestJSON = request)
        } catch (e: CreateCredentialException) {
            return handleCreateErrors(e)
        }
    }

    private suspend fun prefetchCredentials(providers: GetCredentialRequest) {
        val context = appContext.activityProvider?.currentActivity!! as Context
        val credentialManager = CredentialManager.create(context)
        // Only allow this code to execute on sdk  34 and above
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            credentialManager.prepareGetCredential(request = providers)
        }
    }

    private suspend fun intitiateLogin(providers: GetCredentialRequest): LoginResponse {
        val context = appContext.activityProvider?.currentActivity!! as Context
        val credentialManager = CredentialManager.create(context)
        try {
            val result =
                credentialManager.getCredential(context = context, request = providers)
            return parseLoginResponse(result)
        } catch (e: GetCredentialException) {
            return handleGetErrors(e)
        }
    }

    private fun parseLoginResponse(response: GetCredentialResponse): LoginResponse {
        when (response.credential) {
            is PasswordCredential -> {
                val credential = response.credential as PasswordCredential
                return UsernamePasswordLoginResponse(
                    username = credential.id,
                    password = credential.password
                )

            }
            is PublicKeyCredential -> {
                val credential = response.credential as PublicKeyCredential
                return PassKeyLoginResponse(
                    responseJSON = credential.authenticationResponseJson
                )
            }

            is CustomCredential -> {
                if (response.credential.type == GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL) {
                    val credential = GoogleIdTokenCredential.createFrom(response.credential.data)
                    return GoogleLoginResponse(
                        displayName = credential.displayName,
                        familyName = credential.familyName,
                        givenName = credential.givenName,
                        id = credential.id,
                        idToken = credential.idToken,
                        phoneNumber = credential.phoneNumber,
                        profilePictureUri = credential.profilePictureUri.toString()
                    )
                } else {
                    return LoginErrorResponse(
                        type = "UnknownCustomCredential",
                        message = "Unknown Custom credential type"
                    )
                }
            }
            else -> {
                return LoginErrorResponse(
                    type = "UnknownCredential",
                    message = "Unknown credential type"
                )
            }
        }
    }


}
