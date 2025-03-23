---
description: Preload Credentials on App start to improve performance
---

# Performance Improvements

If Android Credential Manager is taking too long to appear when you call the login method, you can preload credentials at the start of the app. Android Credential Manager will  fetch the credentials in the background and prepare them for when the login method is called. This greatly improves performance in some scenarios. Below is an example snippet for preloading Google and Username/Password Credentials.

```typescript
import { CredentialManager } from "credential-manager/CredentialManager";
import {
  GoogleProvider,
  UsernamePasswordProvider,
} from "credential-manager/loginProviders/LoginProviders";

CredentialManager.prefetchCredentials([
      new UsernamePasswordProvider({}),
      new GoogleProvider({
        requireVerifiedPhoneNumber: true,
        serverClientId:
          "236165471941-5j2k7v03af3evisqvo8153eme4vjnfvq.apps.googleusercontent.com",
      }),
    ]);
```

