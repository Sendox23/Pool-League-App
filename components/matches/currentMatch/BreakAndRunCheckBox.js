import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Colors } from '../../../constants/colors';
export default  BreakAndRunCheckBox = ({ value, onValueChange }) => {
  return (
    <View style={styles.breakAndRunContainer}>
      <CheckBox value={value} onValueChange={onValueChange} />
      <Text style={styles.checkBoxText}>Break & Run</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    breakAndRunContainer: {
        flexDirection: "row",
        justifyContent: "center", // Center items horizontally
        alignItems: "center", // Center items vertically
        marginTop: 10,
        paddingVertical: 6, // Increased vertical padding for more vertical space
        marginVertical: 5, // Added vertical margin for more spacing around
      },
    
      checkBoxText: {
        marginLeft: 8, // Slightly more space between checkbox and text
        color: Colors.secondary50,
        fontSize: 14, // Increased font size for clarity
        fontWeight: "500", // Made the text a bit bolder
      },
})