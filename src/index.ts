// Reexport the native module. On web, it will be resolved to CredentialManagerModule.web.ts
// and on native platforms to CredentialManagerModule.ts
export { default } from './CredentialManagerModule';
export { default as CredentialManagerView } from './CredentialManagerView';
export * from  './CredentialManager.types';
