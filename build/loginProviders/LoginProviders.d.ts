import { GoogleButtonProviderProps, GoogleProviderProps, LoginProvider, LoginProviderType, PassKeyCreatorProps, PassKeyProviderProps, UsernamePasswordProviderProps } from "./types";
export declare class UsernamePasswordProvider implements LoginProvider {
    readonly name = LoginProviderType.USERNAME_PASSWORD;
    allowedUserIds: string[];
    autoSelect: boolean;
    constructor({ allowedUserIds, autoSelect, }?: UsernamePasswordProviderProps);
    serialize(): object;
}
export declare class GoogleProvider implements LoginProvider {
    readonly name = LoginProviderType.GOOGLE;
    autoSelect: boolean;
    authorizedAccountsOnly: boolean;
    nonce: string;
    requireVerifiedPhoneNumber: boolean;
    serverClientId: string;
    constructor({ serverClientId, autoSelect, authorizedAccountsOnly, nonce, requireVerifiedPhoneNumber, }: GoogleProviderProps);
    serialize(): object;
}
export declare class GoogleButtonProvider implements LoginProvider {
    readonly name = LoginProviderType.GOOGLE_BUTTON;
    serverClientId: string;
    nonce?: string;
    domainFilter?: string;
    constructor({ serverClientId, nonce, domainFilter, }: GoogleButtonProviderProps);
    serialize(): object;
}
export declare class PasskeyProvider implements LoginProvider {
    readonly name = LoginProviderType.PASSKEY;
    challenge: string;
    allowCredentials?: {
        type: "public-key";
        id: string;
        transports?: string[];
    }[];
    timeout: number;
    userVerification: string;
    rpId: string;
    constructor({ challenge, allowCredentials, timeout, userVerification, rpId, }: PassKeyProviderProps);
    serialize(): object;
}
export declare class PassKeyCreator implements PassKeyCreatorProps {
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
    constructor({ challenge, app, user, timeout }: PassKeyCreatorProps);
    generateResponse(): string;
}
//# sourceMappingURL=LoginProviders.d.ts.map