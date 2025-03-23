---
description: Prompt your users to save a new passkey for faster login
---

# Creating a Passkey

<figure><img src="../.gitbook/assets/image (1).png" alt="Creating a Passkey" width="205"><figcaption><p>Creating a new Passkey</p></figcaption></figure>

Passkeys is a a relatively new concept that Google has introduced to its mobile ecosystem in order to improve authentication ease while increasing security over simple passwords. Passkeys under the hood use cryptographic keys in order to allow for authentication, but Google presents these keys in the form of your device's screen lock and or bio metrics. Passkeys are not meant to replace passwords yet but are instead an alternative login method to the traditional password method.

## Create a new Passkey

To create a new passkey, use the following code:

```typescript
import { CredentialManager } from "credential-manager/CredentialManager";
CredentialManager.createPassKey(
      new PassKeyCreator({
        app: {
          name: "Android-Credential-Manager", // Name of the App stored in the cred
          domain: "guhansensam.com", // Domain where your Digital Assets are stored
        },
        challenge: "abc123", // Must be Base64 Encodable
        user: {
          displayName: "Guhansen Sam", // Display Name of the User
          id: "1234567890", // Unique Identifier for the User
          name: "guhansensam", // Username of the User
        },
        timeout: 180000, // Timeout in milliseconds
      }),
    );
```

For more information on what these fields are please refer to the [official documentation](https://w3c.github.io/webauthn/#dictdef-publickeycredentialcreationoptionsjson) for passkeys support.

{% hint style="warning" %}
Make sure you provide the domain that you registered in your Digital Asset Links file in order for your saved passkeys to work for both your app and your website.
{% endhint %}



