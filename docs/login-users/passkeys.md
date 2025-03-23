---
description: Sign in Users with their saved passkeys
---

# Passkeys

Use this provider if you have the option for users to add passkeys to their account.

```typescript
import {
  PasskeyProvider,
} from "credential-manager/loginProviders/LoginProviders";
import { LoginProvider } from "credential-manager/loginProviders/types";

const provider: LoginProvider = new PasskeyProvider({
      challenge: "abc123", // The same challenge you used to create the passkey
      timeout: 180000, // Time to wait before dropping the request. Suggested 18000
      rpId: "guhansensam.com", // Your domain under which the passkey was created
      userVerification: "required", // Whether user verification is required
    });
```



