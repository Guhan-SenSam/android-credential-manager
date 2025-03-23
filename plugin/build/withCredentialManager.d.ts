import { ConfigPlugin } from "@expo/config-plugins";
interface CredentialManagerPluginProps {
    domainUrl?: string;
}
declare const withCredentialManager: ConfigPlugin<CredentialManagerPluginProps>;
export default withCredentialManager;
