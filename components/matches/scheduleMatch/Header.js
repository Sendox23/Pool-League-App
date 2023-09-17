import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function Header({ title }) {
  return <Text style={styles.headerText}>{title}</Text>;
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary50,
    alignSelf: "center",
    marginVertical: 10
  },
});
