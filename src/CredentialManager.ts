import CredentialManagerModule from "./CredentialManagerModule";
import {
  GoogleLoginResponse, LoginResponse, PassKeyLoginResponse,
  UsernamePasswordLoginResponse,
} from "./LoginResponse.types";
import {LoginProvider, LoginProviderType} from "./loginProviders/types";
import {CreateResponse, UsernamePasswordCreateResponse} from "./CreateResponse.types";
import {createCredErrorHandler, loginErrorHandler} from "./errors/ErrorHandler";
import {GoogleButtonProvider, PassKeyCreator} from "./loginProviders/LoginProviders";

export class CredentialManager {
  static saveUsernameAndPassword(username: string, password: string): UsernamePasswordCreateResponse | null {
    const result = JSON.parse(CredentialManagerModule.saveUsernameAndPassword(username, password)) as CreateResponse
    if (result.name === "Error"){
      createCredErrorHandler(result)
    } else if (result.name === "UsernamePassword") {
      return result
    } else {
      throw new Error("Invalid response")
    }
    return null
  }

  static createPassKey(request: PassKeyCreator): PassKeyCreator | null {
    const result = JSON.parse(CredentialManagerModule.createPassKey(request.generateResponse())) as CreateResponse
    if (result.name === "Error"){
      createCredErrorHandler(result)
    } else if (result.name === "PassKey") {
      return request
    } else {
      throw new Error("Invalid response")
    }
    return null
  }


  static login(loginProviders: LoginProvider[]) {
    const serializedLoginTypes = loginProviders.map((loginType) =>
      loginType.serialize(),
    );
    const result = JSON.parse(
      CredentialManagerModule._login(JSON.stringify(serializedLoginTypes)),
    ) as LoginResponse;
    switch (result.name) {
      case "Error":
        loginErrorHandler(result)
        break;
      case LoginProviderType.USERNAME_PASSWORD:
        return result as UsernamePasswordLoginResponse;
      case LoginProviderType.GOOGLE:
        return result as GoogleLoginResponse;
      case LoginProviderType.PASSKEY:
        return result as PassKeyLoginResponse;
    }
    return null;
  }

  static loginWithGoogle(provider: GoogleButtonProvider ): GoogleLoginResponse | null {
    const providers = [provider].map((loginType) => loginType.serialize());
    const result = JSON.parse(
      CredentialManagerModule._login(JSON.stringify(providers)),
    ) as LoginResponse;
    switch (result.name) {
      case "Error":
        loginErrorHandler(result)
        break;
      case LoginProviderType.GOOGLE:
        return result as GoogleLoginResponse;
    }
    return null;
  }

  static prefetchCredentials(loginProviders: LoginProvider[]): void {
    const serializedLoginProviders = loginProviders.map((loginProvider) =>
      loginProvider.serialize(),
    );
    CredentialManagerModule.prefetchCredentials(
      JSON.stringify(serializedLoginProviders),
    );
  }
}
