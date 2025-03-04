---
description: Display all the saved credentials an user has to allow them to login
---

# Overview

<figure><img src="../.gitbook/assets/image (4).png" alt="Bottom card that appears for login with Credential Manager" width="205"><figcaption><p>Credential Manager Login</p></figcaption></figure>

Android Credential Manager presents a bottom card to its users with the available authentication methods that you have configured. Each credential type available is divided into a provider. Configure these providers and pass them to the login method and the requested login providers will be presented to the user if they are applicable.

## Example

The following is an example snippet for allowing an user to login using either their saved username/password or using their Google Account

```typescript
import { CredentialManager } from "credential-manager/CredentialManager";
import {
  GoogleProvider,
  UsernamePasswordProvider,
} from "credential-manager/loginProviders/LoginProviders";

CredentialManager.login([
      new UsernamePasswordProvider({}),
      new GoogleProvider({
        requireVerifiedPhoneNumber: true,
        serverClientId:
          "236165471941-5j2k7v03af3evisqvo8153eme4vjnfvq.apps.googleusercontent.com",
      }),
    ]);
```

The available options for each provider is documented in the next sections

