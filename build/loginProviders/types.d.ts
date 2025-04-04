export declare enum LoginProviderType {
    USERNAME_PASSWORD = "UsernamePassword",
    GOOGLE = "Google",
    GOOGLE_BUTTON = "GoogleButton",
    PASSKEY = "PassKey"
}
export interface LoginProvider {
    readonly name: LoginProviderType;
    autoSelect?: boolean;
    serialize(): object;
}
interface BaseLoginProviderProps {
    autoSelect?: boolean;
}
export interface UsernamePasswordProviderProps extends BaseLoginProviderProps {
    allowedUserIds?: string[];
}
export interface GoogleProviderProps extends BaseLoginProviderProps {
    serverClientId: string;
    authorizedAccountsOnly?: boolean;
    nonce?: string;
    requireVerifiedPhoneNumber?: boolean;
}
export interface GoogleButtonProviderProps extends BaseLoginProviderProps {
    serverClientId: string;
    nonce?: string;
    domainFilter?: string;
}
export interface PassKeyProviderProps {
    challenge: string;
    allowCredentials?: {
        type: "public-key";
        id: string;
        transports?: string[];
    }[];
    timeout: number;
    userVerification: string;
    rpId: string;
}
export interface PassKeyCreatorProps {
    challenge: string;
    app: {
        name: string;
        domain: string;
    };
    user: {
        id: string;
        name: string;
        displayName: string;
    };
    timeout?: number;
}
export {};
//# sourceMappingURL=types.d.ts.map