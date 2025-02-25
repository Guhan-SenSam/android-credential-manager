package expo.modules.credentialmanager

// Stores all return types when a new credential is created


sealed class CreateResponse {
    abstract val name: String
}

data class CreateErrorResponse(
    override val name: String = "Error",
    val type: String,
    val message: String
) : CreateResponse()

data class UsernamePasswordResponse(
    override val name: String = "UsernamePassword",
    val username: String,
    val password: String
) : CreateResponse()


data class PasskeyResponse(
    override val name: String = "PassKey",
    val requestJSON: String
) : CreateResponse()

data class Response(
    val clientDataJSON: String,
    val attestationObject: String
)