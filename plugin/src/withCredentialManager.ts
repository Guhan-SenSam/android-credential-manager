import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
  withStringsXml,
} from "@expo/config-plugins";

interface CredentialManagerPluginProps {
  domainUrl?: string;
}

const withCredentialManager: ConfigPlugin<CredentialManagerPluginProps> = (
  config,
  { domainUrl } = {},
) => {
  if (!domainUrl) {
    console.warn(
      "No domain URL Provided, Passkeys will not work without a domain URL",
    );
  }

  config = withAndroidManifest(config, async (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults,
    );

    // Add the meta-data for asset statements
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "asset_statements",
      "@string/asset_statements",
    );
    console.log("Added asset_statements to AndroidManifest.xml");

    return config;
  });

  config = withStringsXml(config, (config) => {
    const existingString = config.modResults.resources.string?.find(
      (str) => str.$.name === "asset_statements",
    );
    if (!existingString) {
      config.modResults.resources.string?.push({
        $: {
          name: "asset_statements",
          translatable: "false",
        },
        _: `[{
          "include": "${domainUrl}/assetlinks.json"
        }]`,
      });
      console.log("Added asset_statements to strings.xml");
    } else {
      console.log("asset_statements already exists in strings.xml");
    }

    return config;
  });

  return config;
};

export default withCredentialManager;
