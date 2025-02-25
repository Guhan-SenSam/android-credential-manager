import {
    GoogleButtonProviderProps,
    GoogleProviderProps,
    LoginProvider,
    LoginProviderType, PassKeyCreatorProps,
    PassKeyProviderProps,
    UsernamePasswordProviderProps
} from "./types";


export class UsernamePasswordProvider implements LoginProvider {
  readonly name = LoginProviderType.USERNAME_PASSWORD;
  public allowedUserIds: string[];
  public autoSelect: boolean;

  constructor({
    allowedUserIds = [],
    autoSelect = false,
  }: UsernamePasswordProviderProps = {}) {
    this.allowedUserIds = allowedUserIds;
    this.autoSelect = autoSelect;
  }

  serialize(): object {
    return {
      name: this.name,
      options: {
        allowedUserIds: this.allowedUserIds,
        autoSelect: this.autoSelect,
      },
    };
  }
}

export class GoogleProvider implements LoginProvider {
  readonly name = LoginProviderType.GOOGLE;
  public autoSelect: boolean;
  public authorizedAccountsOnly: boolean;
  public nonce: string;
  public requireVerifiedPhoneNumber: boolean;
  public serverClientId: string;

  constructor({
    serverClientId,
    autoSelect = false,
    authorizedAccountsOnly = false,
    nonce = "",
    requireVerifiedPhoneNumber = false,
  }: GoogleProviderProps) {
    if (!serverClientId) {
      throw new Error("serverClientId is required");
    }
    this.autoSelect = autoSelect;
    this.requireVerifiedPhoneNumber = requireVerifiedPhoneNumber;
    this.nonce = nonce;
    this.authorizedAccountsOnly = authorizedAccountsOnly;
    this.serverClientId = serverClientId;
  }

  serialize(): object {
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


export class  GoogleButtonProvider implements LoginProvider{
    readonly name = LoginProviderType.GOOGLE_BUTTON;
    public serverClientId: string;
    public nonce?: string;
    public domainFilter?: string;

    constructor({
        serverClientId,
        nonce,
        domainFilter,
    }: GoogleButtonProviderProps) {
        if (!serverClientId) {
            throw new Error("serverClientId is required");
        }
        this.serverClientId = serverClientId;
        this.nonce = nonce;
        this.domainFilter = domainFilter;
    }

    serialize(): object {
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

export class PasskeyProvider implements LoginProvider {
    readonly name = LoginProviderType.PASSKEY;
    public challenge: string;
    public allowCredentials?: {
        type: "public-key"; // Always
        id: string; // Base64URL-encoded credential ID
        transports?: string[]; // List of transports (e.g., "usb", "ble", "nfc")
    }[]
    public timeout: number;
    public userVerification: string;
    public rpId: string;

    constructor({
        challenge,
        allowCredentials,
        timeout,
        userVerification,
        rpId,
    }: PassKeyProviderProps) {
        this.challenge = challenge;
        this.allowCredentials = allowCredentials;
        this.timeout = timeout;
        this.userVerification = userVerification;
        this.rpId = rpId;
    }

    serialize(): object {
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


export class PassKeyCreator implements PassKeyCreatorProps {
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

  constructor({ challenge, app, user, timeout }: PassKeyCreatorProps) {
    this.challenge = challenge;
    this.app = app;
    this.user = user;
    this.timeout = timeout;
  }

  generateResponse(): string {
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
