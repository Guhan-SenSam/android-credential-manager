import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GoogleLogo } from "./GoogleLogo";
export const SignInWithGoogleButton = ({ theme = "light", shape = "rectangle", text = "Sign in with Google", onPress, }) => {
    // Determine styles based on theme and shape
    const buttonStyles = [
        styles.button,
        shape === "pill" ? styles.pillShape : styles.rectangleShape,
        theme === "light"
            ? styles.lightTheme
            : theme === "dark"
                ? styles.darkTheme
                : styles.neutralTheme,
    ];
    const textStyles = [
        styles.buttonText,
        theme === "dark" ? styles.darkThemeText : styles.lightThemeText,
    ];
    return (<TouchableOpacity style={buttonStyles} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.buttonContent}>
        <GoogleLogo />
        <Text style={textStyles}>{text}</Text>
      </View>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 200,
    },
    pillShape: {
        borderRadius: 100,
    },
    rectangleShape: {
        borderRadius: 4,
    },
    lightTheme: {
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
    },
    darkTheme: {
        backgroundColor: "#000000",
        borderColor: "#FFFFFF",
    },
    neutralTheme: {
        backgroundColor: "#F2F2F2",
        borderColor: "#FFFFFF",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 8,
    },
    lightThemeText: {
        color: "#757575",
    },
    darkThemeText: {
        color: "#FFFFFF",
    },
});
//# sourceMappingURL=SignInWithGoogleButton.js.map