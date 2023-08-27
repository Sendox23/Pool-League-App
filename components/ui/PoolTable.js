import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function PoolTable({ children }) {
  return (
    <View style={styles.poolTable}>
      <View style={styles.cushion}>
        {children}
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={[styles.pocket, pocketPositions[index]]} />
          ))}
        {diamondPositions.map((pos, index) => (
          <View key={index} style={[styles.diamond, pos]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  poolTable: {
    marginVertical: 50,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#49270e", // Brown wooden border
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  cushion: {
    flex: 1,
    backgroundColor: Colors.primary800,
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  pocket: {
    position: "absolute",
    width: 36, // Further increase width
    height: 36, // Further increase height
    borderRadius: 18,
    backgroundColor: Colors.primary800,
    borderColor: Colors.primary800,
    borderWidth: 2,
    zIndex: 1,
  },

  diamond: {
    position: "absolute",
    width: 6,
    height: 6,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }], // This will make the square look like a diamond
    zIndex: 2,
    borderWidth: 1,
    borderColor: "black",
  },
});

const pocketPositions = [
  { top: -15, left: -15 },
  { top: -15, right: -15 },
  { bottom: -15, left: -15 },
  { bottom: -15, right: -15 },
  { top: "50%", left: -18, transform: [{ translateY: -20 }] },
  { top: "50%", right: -18, transform: [{ translateY: -20 }] },
];
const diamondPositions = [
  { top: "10%", left: -13 },
  { top: "30%", left: -13 },
  { top: "70%", left: -13 },
  { top: "90%", left: -13 },
  { top: "10%", right: -13 },
  { top: "30%", right: -13 },
  { top: "70%", right: -13 },
  { top: "90%", right: -13 },
  { top: -13, left: "25%" },
  { top: -13, right: "25%" },
  { bottom: -13, left: "25%" },
  { bottom: -13, right: "25%" },
];
