import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";
export default AddGameButton = ({ playerName, onPress, isDisabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText} numberOfLines={2}>
        {"Add Win for \n" + playerName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary100,
    width: 150,
    height: 50, // Increased height to accommodate two lines of text
    shadowColor: Colors.primary600,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center", // Ensure text is centered
  },
  buttonDisabled: {
    backgroundColor: Colors.secondary300,
    shadowColor: "transparent",
  },
});
