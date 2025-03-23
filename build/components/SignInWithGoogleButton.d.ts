import { FC } from "react";
interface SignInWithGoogleButtonProps {
    theme: "light" | "dark" | "neutral";
    shape: "pill" | "rectangle";
    text: "Sign in with Google" | "Sign up with Google" | "Continue with Google" | "Sign in";
    onPress?: () => void;
}
export declare const SignInWithGoogleButton: FC<SignInWithGoogleButtonProps>;
export {};
//# sourceMappingURL=SignInWithGoogleButton.d.ts.map