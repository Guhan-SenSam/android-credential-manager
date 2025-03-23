import "./css/global.css";

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GoogleButtonProvider,
  GoogleProvider,
  PassKeyCreator,
  PasskeyProvider,
  UsernamePasswordProvider,
} from "android-credential-manager/build/loginProviders";
import { LoginProvider } from "android-credential-manager/src/loginProviders/types";
import { StatusBar, StatusBarAnimation } from "expo-status-bar";
import { CredentialManager } from "android-credential-manager/src/CredentialManager";
import { SignInWithGoogleButton } from "../src/components/SignInWithGoogleButton";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-[#FF6500] p-4 mt-4 rounded-lg active:opacity-80"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text className="text-black text-md font-semibold text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function App() {
  // Local States
  const [username, setUsername] = useState<string>("dummy");
  const [password, setPassword] = useState<string>("example");
  const [loginMethods, setLoginMethods] = useState<string[]>([]);

  // Toggle handlers for login methods
  const toggleLoginMethod = (method: string) => {
    setLoginMethods((prevMethods) => {
      if (prevMethods.includes(method)) {
        return prevMethods.filter((m) => m !== method);
      } else {
        return [...prevMethods, method];
      }
    });
  };

  // Check if a login method is enabled
  const isMethodEnabled = (method: string) => loginMethods.includes(method);

  /**
   * Save a new Username and Password Credential.
   */
  const createUsernamePasswordCred = () => {
    if (!username || !password) {
      return;
    }
    CredentialManager.saveUsernameAndPassword(username, password);
  };

  /**
   * Creates a new Passkey for the user.
   */
  const createPasskeyCred = () => {
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
      })
    );
  };

  /**
   * Logs the user in with the methods that are configured in the user interface
   */
  const login = () => {
    const loginProviders: LoginProvider[] = [];

    loginMethods.forEach((method) => {
      switch (method) {
        case "UsernamePassword":
          loginProviders.push(new UsernamePasswordProvider({}));
          break;
        case "Passkey":
          loginProviders.push(
            new PasskeyProvider({
              challenge: "abc123", // The same challenge used to create the Passkey
              timeout: 180000,
              rpId: "guhansensam.com", // The same domain used to create the Passkey
              userVerification: "required",
            })
          );
          break;
        case "Google":
          loginProviders.push(
            new GoogleProvider({
              requireVerifiedPhoneNumber: true,
              serverClientId:
                "236165471941-5j2k7v03af3evisqvo8153eme4vjnfvq.apps.googleusercontent.com",
            })
          );
          break;
      }
    });

    if (loginProviders.length < 1) {
      return;
    }

    CredentialManager.login(loginProviders);
  };

  /**
   * This function is used to trigger the sign in with Google Manually.
   * It is the suggested method by Google to trigger the sign in with Google.
   */
  const loginInWithGoogleButton = () => {
    CredentialManager.loginWithGoogle(
      new GoogleButtonProvider({
        serverClientId:
          "236165471941-5j2k7v03af3evisqvo8153eme4vjnfvq.apps.googleusercontent.com",
      })
    );
  };

  return (
    <SafeAreaView>
      <StatusBar style="inverted" />
      <ScrollView className={"bg-[#0B192C] h-screen w-full"}>
        <View className="bg-[#0B192C] h-screen w-full flex p-4 justify-start mt-10">
          {/* Header */}
          <Text className="text-gray-300 text-3xl font-semibold text-center">
            Android-Credential-Manager
          </Text>
          <Text className="text-gray-500 text-md font-regular text-center">
            React Native Demo
          </Text>

          {/* Create Section */}
          <View className="mt-10">
            <Text className="text-gray-300 text-xl font-semibold text-start">
              Create Credentials
            </Text>
            <View className="bg-[#1E2A47] p-4 mt-4 rounded-lg">
              <Text className="text-gray-300 text-md font-semibold text-start">
                Username Password:
              </Text>
              <TextInput
                className="bg-[#1E3E62] text-gray-300 p-4 mt-4 rounded-lg"
                placeholder="Username"
                placeholderTextColor="#4B6A9B"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                className="bg-[#1E3E62] text-gray-300 p-4 mt-4 rounded-lg"
                placeholder="Password"
                placeholderTextColor="#4B6A9B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button title="Create" onPress={createUsernamePasswordCred} />

              <Text className="text-gray-300 text-md font-semibold text-start mt-4">
                PassKey:
              </Text>
              <Button title="Create Passkey" onPress={createPasskeyCred} />
            </View>
          </View>

          {/* Login Section */}
          <View className="mt-10">
            <Text className="text-gray-300 text-xl font-semibold text-start">
              Login
            </Text>
            <View className="bg-[#1E2A47] p-4 mt-4 rounded-lg gap-y-6">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-300 text-md font-semibold text-start">
                  Username Password:
                </Text>
                <Switch
                  value={isMethodEnabled("UsernamePassword")}
                  onValueChange={() => toggleLoginMethod("UsernamePassword")}
                  thumbColor="#FF6500"
                  trackColor={{ false: "#767577", true: "#FFB380" }}
                />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-300 text-md font-semibold text-start">
                  PassKey:
                </Text>
                <Switch
                  value={isMethodEnabled("Passkey")}
                  onValueChange={() => toggleLoginMethod("Passkey")}
                  thumbColor="#FF6500"
                  trackColor={{ false: "#767577", true: "#FFB380" }}
                />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-300 text-md font-semibold text-start">
                  Google Login:
                </Text>
                <Switch
                  value={isMethodEnabled("Google")}
                  onValueChange={() => toggleLoginMethod("Google")}
                  thumbColor="#FF6500"
                  trackColor={{ false: "#767577", true: "#FFB380" }}
                />
              </View>

              <Button title="Login" onPress={login} />

              <SignInWithGoogleButton
                theme="dark"
                shape="pill"
                text="Sign in with Google"
                onPress={loginInWithGoogleButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
