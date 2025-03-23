import { LoginProviderType, } from "./types";
export class UsernamePasswordProvider {
    name = LoginProviderType.USERNAME_PASSWORD;
    allowedUserIds;
    autoSelect;
    constructor({ allowedUserIds = [], autoSelect = false, } = {}) {
        this.allowedUserIds = allowedUserIds;
        this.autoSelect = autoSelect;
    }
    serialize() {
        return {
            name: this.name,
            options: {
                allowedUserIds: this.allowedUserIds,
                autoSelect: this.autoSelect,
            },
        };
    }
}
export class GoogleProvider {
    name = LoginProviderType.GOOGLE;
    autoSelect;
    authorizedAccountsOnly;
    nonce;
    requireVerifiedPhoneNumber;
    serverClientId;
    constructor({ serverClientId, autoSelect = false, authorizedAccountsOnly = false, nonce = "", requireVerifiedPhoneNumber = false, }) {
        if (!serverClientId) {
            throw new Error("serverClientId is required");
        }
        this.autoSelect = autoSelect;
        this.requireVerifiedPhoneNumber = requireVerifiedPhoneNumber;
        this.nonce = nonce;
        this.authorizedAccountsOnly = authorizedAccountsOnly;
        this.serverClientId = serverClientId;
    }
    serialize() {
        return {
            name: this.name,
            options: {
                autoSelect: this.autoSelect,
                authorizedAccountsOnly: this.authorizedAccountsOnly,
                nonce: this.nonce,
                requireVerifiedPhoneNumber: this.requireVerifiedPhoneNumber,
                serverClientId: this.serverClientId,
            },
        };
    }
}
export class GoogleButtonProvider {
    name = LoginProviderType.GOOGLE_BUTTON;
    serverClientId;
    nonce;
    domainFilter;
    constructor({ serverClientId, nonce, domainFilter, }) {
        if (!serverClientId) {
            throw new Error("serverClientId is required");
        }
        this.serverClientId = serverClientId;
        this.nonce = nonce;
        this.domainFilter = domainFilter;
    }
    serialize() {
        return {
            name: this.name,
            options: {
                serverClientId: this.serverClientId,
                nonce: this.nonce,
                domainFilter: this.domainFilter,
            },
        };
    }
}
export class PasskeyProvider {
    name = LoginProviderType.PASSKEY;
    challenge;
    allowCredentials;
    timeout;
    userVerification;
    rpId;
    constructor({ challenge, allowCredentials, timeout, userVerification, rpId, }) {
        this.challenge = challenge;
        this.allowCredentials = allowCredentials;
        this.timeout = timeout;
        this.userVerification = userVerification;
        this.rpId = rpId;
    }
    serialize() {
        return {
            name: this.name,
            options: {
                challenge: this.challenge,
                allowCredentials: this.allowCredentials,
                timeout: this.timeout,
                userVerification: this.userVerification,
                rpId: this.rpId,
            },
        };
    }
}
export class PassKeyCreator {
    challenge;
    app;
    user;
    timeout;
    constructor({ challenge, app, user, timeout }) {
        this.challenge = challenge;
        this.app = app;
        this.user = user;
        this.timeout = timeout;
    }
    generateResponse() {
        return JSON.stringify({
            challenge: this.challenge,
            rp: {
                name: this.app.name,
                id: this.app.domain,
            },
            user: {
                id: this.user.id,
                name: this.user.name,
                displayName: this.user.displayName,
            },
            pubKeyCredParams: [
                {
                    type: "public-key",
                    alg: -7,
                },
                {
                    type: "public-key",
                    alg: -257,
                },
            ],
            timeout: this.timeout,
            attestation: "none",
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                requireResidentKey: true,
                residentKey: "required",
                userVerification: "required",
            },
        });
    }
}
//# sourceMappingURL=LoginProviders.js.map