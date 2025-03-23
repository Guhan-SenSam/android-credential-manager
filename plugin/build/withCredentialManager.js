"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withCredentialManager = (config, { domainUrl } = {}) => {
    if (!domainUrl) {
        console.warn("No domain URL Provided, Passkeys will not work without a domain URL");
    }
    config = (0, config_plugins_1.withAndroidManifest)(config, async (config) => {
        const mainApplication = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
        // Add the meta-data for asset statements
        config_plugins_1.AndroidConfig.Manifest.addMetaDataItemToMainApplication(mainApplication, "asset_statements", "@string/asset_statements");
        console.log("Added asset_statements to AndroidManifest.xml");
        return config;
    });
    config = (0, config_plugins_1.withStringsXml)(config, (config) => {
        const existingString = config.modResults.resources.string?.find((str) => str.$.name === "asset_statements");
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
        }
        else {
            console.log("asset_statements already exists in strings.xml");
        }
        return config;
    });
    return config;
};
exports.default = withCredentialManager;
