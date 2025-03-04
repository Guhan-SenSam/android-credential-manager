---
description: Sign in / Sign up user with Google.
---

# Google Sign In

Over the years Google has introduced numerous ways for developers to allow their users to sign in through Google. This has created much confusion on which method is the proper and modern way. Android Credential Manager uses the latest and  recommended method by Google to sign in your users. There are two ways this flow can be approached; an Implicit call to the credential manager which surfaces a bottom card with the option to select the login method or an explicit method of clicking a button to launch a dialog that allows the user to sign in with their google account.

## Implicit Method:

The implicit method is similar to how other login providers are used. Use this provider in combination with the other providers when an user visits your sign in page. This means they can quickly get signed in with minimal number of clicks on the screen

<pre class="language-typescript"><code class="lang-typescript">mport {
  GoogleProvider,
} from "credential-manager/loginProviders/LoginProviders";
import { LoginProvider } from "credential-manager/loginProviders/types";
<strong>
</strong><strong>const provider: LoginProvider = new GoogleProvider({
</strong>      serverClientId:
        "236165471941-5j2k7v03af3evisqvo8153eme4vjnfvq.apps.googleusercontent.com",
      authorizedAccountsOnly: true,
      autoSelect: true, // Auto select an authorized Google Account if there is only one
      nonce: "abc123", // Provide extra secruity to prevent replay attacks

      requireVerifiedPhoneNumber: true, // Only google accounts with verified numbers are allowed
    });
</code></pre>

**`serverClientId :`** This is the server OAuth client ID that your server uses to verify your user on your back-end if they are actually part of your application. To generate an id follow [these instructions.](https://developer.android.com/identity/sign-in/credential-manager-siwg#set-google) On instructions on how to parse this information check this [link ](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token).

**`authorizedAccountsOnly :`** Defaults to false. Use this prop to only show users their google accounts that have already been signed in once in to your application (i.e. these accounts have been authorized). This is typically only used if you differentiate between sign in with Google and sign up with Google. Your sign up flow would have this property set to `false` to allow the user to choose any of their Google Accounts and the signup would be set to `true` to only allow already signed up accounts.

## Explicit Method:

<figure><img src="../.gitbook/assets/image (5).png" alt="" width="205"><figcaption><p>Explicit Popup to sign in with Google</p></figcaption></figure>

The explicit method is used when the user has dismissed the bottom card from the implicit method. It displays your typical sign in with Google popup. This method is intended to be triggered from a button by the users explicit actions.

```typescript
import { CredentialManager } from "credential-manager/CredentialManager";

CredentialManager.loginWithGoogle(
      new GoogleButtonProvider({
        serverClientId:
          "236165471941-5j2k7v03af3evisqvo8153eme4vjnfvq.apps.googleusercontent.com",
        autoSelect: false,
        domainFilter: "guhansensam.com", // filter google accounts from this domain
        nonce: "abc123", // nonce to prevent replay attacks
      })
    );
```

You can call this function from any button click or you can use the provided Google Button that is designed to match the exact specification as per Google documentation.

```typescript
import { SignInWithGoogleButton } from "credential-manager/components/SignInWithGoogleButton";

 <SignInWithGoogleButton
    theme="dark"
    shape="pill"
    text="Sign in with Google"
    onPress={}
    />
```

&#x20;There are different options available for the theme, shape and the text presented on the button
