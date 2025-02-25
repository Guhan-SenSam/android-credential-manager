package expo.modules.credentialmanager

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonParseException
import java.lang.reflect.Type

class LoginMethodDeserializer : JsonDeserializer<LoginProvider> {
    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): LoginProvider {
        val jsonObject = json.asJsonObject
        return when (val name = jsonObject["name"].asString) {
            "UsernamePassword" -> context.deserialize(
                json,
                UsernamePasswordLoginProvider::class.java
            )

            "Google" -> context.deserialize(
                json,
                GoogleLoginProvider::class.java
            )

            "PassKey" -> context.deserialize(
                json,
                PassKeyLoginProvider::class.java
            )

            "GoogleButton" -> context.deserialize(
                json,
                GoogleButtonLoginProvider::class.java
            )

            else -> throw JsonParseException("Unknown login method: $name")
        }
    }
}