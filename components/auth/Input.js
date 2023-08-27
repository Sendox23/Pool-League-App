import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";

const Input = ({
  autoCapitalize,
  autoComplete,
  styleOptions,
  isSubmitted,
  isValid,
  value,
  setter,
  placeholder,
  type,
  keyboardType,
  isSignUp,
}) => {
  const [isSecure, setIsSecure] = useState(type === "password");
  const [isFocused, setIsFocused] = useState(false);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            styleOptions.input,
            isSubmitted && !isValid && isSignUp ? styleOptions.error : null,
            isFocused ? styleOptions.focus : null,
          ]}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          autoComplete={autoComplete}
          value={value}
          onChangeText={setter}
          placeholderTextColor="#8b8a8a"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === "password" && (
          <TouchableOpacity style={styles.button} onPress={toggleSecureEntry}>
            {isSecure ? (
              <Ionicons
                name="eye-off-outline"
                size={20}
                color={Colors.primary500}
              />
            ) : (
              <Ionicons
                name="eye-outline"
                size={20}
                color={Colors.primary500}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 40,
    backgroundColor: Colors.primary50,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 7,
    paddingRight: 40, // make room for button inside the input field
  },
  button: {
    position: "absolute",
    right: 10, // position from the right
    top: "10%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});

export default Input;
