package expo.modules.credentialmanager

import android.annotation.SuppressLint
import androidx.credentials.webauthn.PublicKeyCredentialDescriptor
import com.google.gson.annotations.SerializedName

sealed class LoginProvider {
    abstract val name: String
}

data class UsernamePasswordLoginProvider(
    override val name: String = "UsernamePassword",
    @SerializedName("options") val options: UsernamePasswordLoginProviderOptions
) : LoginProvider()

data class UsernamePasswordLoginProviderOptions(
    @SerializedName("allowedUserIds") val allowedUserIds: List<String>,
    @SerializedName("autoSelect") val autoSelect: Boolean
)

data class GoogleLoginProvider(
    override val name: String = "Google",
    @SerializedName("options") val options: GoogleLoginProviderOptions
) : LoginProvider()

data class GoogleLoginProviderOptions(
    @SerializedName("authorizedAccountsOnly") val authorizedAccountsOnly: Boolean,
    @SerializedName("nonce") val nonce: String?,
    @SerializedName("requireVerifiedPhoneNumber") val requireVerifiedPhoneNumber: Boolean,
    @SerializedName("serverClientId") val serverClientId: String,
    @SerializedName("autoSelect") val autoSelect: Boolean
)

data class GoogleButtonLoginProvider(
    override val name: String = "GoogleButton",
    @SerializedName("options") val options: GoogleButtonLoginProviderOptions
) : LoginProvider()

data class GoogleButtonLoginProviderOptions(
    @SerializedName("nonce") val nonce: String?,
    @SerializedName("serverClientId") val serverClientId: String,
    @SerializedName("domainFilter") val domainFilter: String?,

)

data class PassKeyLoginProvider(
    override val name: String = "PassKey",
    @SerializedName("options") val options: PassKeyLoginProviderOptions
) : LoginProvider()

data class PassKeyLoginProviderOptions(
    @SerializedName("challenge") val challenge: String,
    @SuppressLint("RestrictedApi") @SerializedName("allowCredentials") val allowCredentials: List<PublicKeyCredentialDescriptor>,
    @SerializedName("timeout") val timeout: Long,
    @SerializedName("userVerification") val userVerification: String,
    @SerializedName("rpId") val rpId: String
)
