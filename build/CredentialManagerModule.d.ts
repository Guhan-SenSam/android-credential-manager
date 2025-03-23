import { NativeModule } from "expo";
declare class CredentialManagerModule extends NativeModule {
    saveUsernameAndPassword(username: string, password: string): string;
    createPassKey(response: string): string;
    _login(logintypes: string): string;
    prefetchCredentials(loginProviders: string): void;
}
declare const _default: CredentialManagerModule;
export default _default;
//# sourceMappingURL=CredentialManagerModule.d.ts.map