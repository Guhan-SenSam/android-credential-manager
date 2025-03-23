import CredentialManagerModule from "./CredentialManagerModule";
import { LoginProviderType } from "./loginProviders/types";
import { createCredErrorHandler, loginErrorHandler, } from "./errors/ErrorHandler";
export class CredentialManager {
    static saveUsernameAndPassword(username, password) {
        const result = JSON.parse(CredentialManagerModule.saveUsernameAndPassword(username, password));
        if (result.name === "Error") {
            createCredErrorHandler(result);
        }
        else if (result.name === "UsernamePassword") {
            return result;
        }
        else {
            throw new Error("Invalid response");
        }
        return null;
    }
    static createPassKey(request) {
        const result = JSON.parse(CredentialManagerModule.createPassKey(request.generateResponse()));
        if (result.name === "Error") {
            createCredErrorHandler(result);
        }
        else if (result.name === "PassKey") {
            return request;
        }
        else {
            throw new Error("Invalid response");
        }
        return null;
    }
    static login(loginProviders) {
        const serializedLoginTypes = loginProviders.map((loginType) => loginType.serialize());
        const result = JSON.parse(CredentialManagerModule._login(JSON.stringify(serializedLoginTypes)));
        switch (result.name) {
            case "Error":
                loginErrorHandler(result);
                break;
            case LoginProviderType.USERNAME_PASSWORD:
                return result;
            case LoginProviderType.GOOGLE:
                return result;
            case LoginProviderType.PASSKEY:
                return result;
        }
        return null;
    }
    static loginWithGoogle(provider) {
        const providers = [provider].map((loginType) => loginType.serialize());
        const result = JSON.parse(CredentialManagerModule._login(JSON.stringify(providers)));
        switch (result.name) {
            case "Error":
                loginErrorHandler(result);
                break;
            case LoginProviderType.GOOGLE:
                return result;
        }
        return null;
    }
    static prefetchCredentials(loginProviders) {
        const serializedLoginProviders = loginProviders.map((loginProvider) => loginProvider.serialize());
        CredentialManagerModule.prefetchCredentials(JSON.stringify(serializedLoginProviders));
    }
}
//# sourceMappingURL=CredentialManager.js.map