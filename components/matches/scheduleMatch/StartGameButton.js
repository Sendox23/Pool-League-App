import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function StartGameButton({ onStartGame }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onStartGame}>
      <Text style={styles.buttonText}>Start Game</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary600,
    borderColor: Colors.secondary200, // Adjust border color
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginTop: 50,   // Reduce margin for cleaner look
    width: 220,      // Increase width for better space
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,    // Increase font size
    fontWeight: "500",   // Semi-bold
  },
});