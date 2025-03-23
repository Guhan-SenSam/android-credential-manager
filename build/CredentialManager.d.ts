import { GoogleLoginResponse, PassKeyLoginResponse, UsernamePasswordLoginResponse } from "./LoginResponse.types";
import { LoginProvider } from "./loginProviders/types";
import { UsernamePasswordCreateResponse } from "./CreateResponse.types";
import { GoogleButtonProvider, PassKeyCreator } from "./loginProviders/LoginProviders";
export declare class CredentialManager {
    static saveUsernameAndPassword(username: string, password: string): UsernamePasswordCreateResponse | null;
    static createPassKey(request: PassKeyCreator): PassKeyCreator | null;
    static login(loginProviders: LoginProvider[]): UsernamePasswordLoginResponse | GoogleLoginResponse | PassKeyLoginResponse | null;
    static loginWithGoogle(provider: GoogleButtonProvider): GoogleLoginResponse | null;
    static prefetchCredentials(loginProviders: LoginProvider[]): void;
}
//# sourceMappingURL=CredentialManager.d.ts.map