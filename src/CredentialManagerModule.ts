import { NativeModule, requireNativeModule } from "expo";
import {CreateResponse} from "./CreateResponse.types";

declare class CredentialManagerModule extends NativeModule {
  saveUsernameAndPassword(username: string, password: string):string
  createPassKey(response: string): string
  _login(logintypes: string): string;
  prefetchCredentials(loginProviders: string): void;
}

export default requireNativeModule<CredentialManagerModule>(
  "CredentialManager",
);
