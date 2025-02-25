package expo.modules.credentialmanager

sealed class LoginResponse {
    abstract val name: String
}

data class LoginErrorResponse (
    override val name: String = "Error",
    val type: String,
    val message: String

) : LoginResponse()

data class UsernamePasswordLoginResponse(
    override val name: String = "UsernamePassword",
    val username: String,
    val password: String
) : LoginResponse()

data class GoogleLoginResponse(
    override val name: String = "Google",
    val displayName: String?,
    val familyName: String?,
    val givenName: String?,
    val id: String,
    val idToken: String,
    val phoneNumber: String?,
    val profilePictureUri: String?

) : LoginResponse()

data class PassKeyLoginResponse (
    override val name: String = "PassKey",
    val responseJSON: String
) : LoginResponse()