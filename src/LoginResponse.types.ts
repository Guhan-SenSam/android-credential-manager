import { LoginProviderType } from "./loginProviders/types";

export type LoginResponse =
  | LoginErrorResponse
  | UsernamePasswordLoginResponse
  | GoogleLoginResponse
  | PassKeyLoginResponse;

export interface LoginErrorResponse {
  name: "Error";
  type: string;
  message: string;
}

export interface UsernamePasswordLoginResponse {
  name: LoginProviderType.USERNAME_PASSWORD;
  username: string;
  password: string;
}

export interface GoogleLoginResponse {
  name: LoginProviderType.GOOGLE;
  displayName: string;
  familyName: string;
  givenName: string;
  id: string;
  idToken: string;
  phoneNumber: string;
  profilePictureUri: string;
}

export interface PassKeyLoginResponse {
  name: LoginProviderType.PASSKEY;
  responseJSON: string;
}
