---
description: Installation Instructions
---

# 🔧 Installation

## Getting Started

This package is designed to work inside Expo projects as it leverages the use of Expo Native Modules. Installation instructions have been provided for when it is used either in Expo CNG or if you have detached your project and are managing the native folders separately.

{% tabs %}
{% tab title="Expo" %}
Installation in expo CNG is as easy as just directly installing the package through your package manager and regenerating your Android native directory.

### NPM

```bash
npm install android-credential-manager
npm run android
```

### Yarn

```bash
yarn add android-credential-manager
yarn android
```

Once the package has been installed, check out the following section on what digital asset linking is and how to configure it in your application.
{% endtab %}

{% tab title="Manual" %}
If you have detached your project from expo CNG and are manually maintaining the native folders, follow these steps to install this package

### 1. Install the Package With Your Package Manager

```
npm install android-credential-manager
```

### 2. Add the Kotlin Dependencies

Add the following two dependencies inside your app-level `build.gradle` file.

<pre class="language-kotlin" data-title="app/build.gradle"><code class="lang-kotlin"><strong>dependencies {
</strong>    implementation("androidx.credentials:credentials:1.5.0-rc01")
    implementation("androidx.credentials:credentials-play-services-auth:1.5.0-rc01")
}
</code></pre>

### 3. Edit your AndroidManifest.xml

Add the following to your `AndroidManifest.xml` file.

{% code title="AndroidManifest.xml" %}
```xml
<meta-data android:name="asset_statements" android:resource="@string/asset_statements" />

```
{% endcode %}

### 4. Configure Your Digital Asset Linking

Refer to&#x20;

{% content-ref url="installation.md" %}
[installation.md](installation.md)
{% endcontent-ref %}

on what is Digital Asset Linking and how to create one.

### 5. Link DigitalAsset URL To Your App

Add the following code inside your `strings.xm`l file. Make sure you update the domain to reflect the domain that you have used to hos the Digital Asset  JSON as detailed in the previous step

{% code title="strings.xml" %}
```xml
<string name="asset_statements" translatable="false">
[{
  \"include\": \"https://signin.example.com/.well-known/assetlinks.json\"
}]
</string>

```
{% endcode %}


{% endtab %}
{% endtabs %}

Add the Plugin to your `app.json.` Make sure you pass in your domain URL as instructed in the DigitalAsset Linking Section.

```json
{
  "expo": {
    "plugins": [
      [
        "android-credential-manager",
        {
          "domainUrl": "https://guhansensam.com"
        }
      ]
    ]
  }
}
```

