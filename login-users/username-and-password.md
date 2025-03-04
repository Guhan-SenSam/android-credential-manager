---
description: Allows users to sign in with their save username and passwords
---

# UserName and Password

Use this provider if you have the option for users to sign in with their username and password. This provider will present the user the option to choose any saved password linked to this app or the respective website through the Digital Asset Linking.

```typescript
import {
  UsernamePasswordProvider,
} from "credential-manager/loginProviders/LoginProviders";
import { LoginProvider } from "credential-manager/loginProviders/types";

const provider: LoginProvider = new UsernamePasswordProvider({
      allowedUserIds: ["guhansensam"], // A list of usernames that are allowed to login
      autoSelect: true, // If only one password is present it is auto chosen
    });
```



