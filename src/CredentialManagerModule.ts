import { NativeModule, requireNativeModule } from 'expo';

import { CredentialManagerModuleEvents } from './CredentialManager.types';

declare class CredentialManagerModule extends NativeModule<CredentialManagerModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CredentialManagerModule>('CredentialManager');
