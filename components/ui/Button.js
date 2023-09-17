import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../constants/colors";

function Button({ children, onPress, disabled = false, style = {} }) {
  return (
    <View style={[styles.container, style.container]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          disabled && styles.disabled,
          style.button,  // overriding/merging style
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View>
          {disabled ? (
            <ActivityIndicator color={Colors.primary900} />
          ) : (
            <Text style={[styles.buttonText, style.buttonText]}>{children}</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: Colors.primary300,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minWidth: "60%",
    maxWidth: "100%",
  },
  pressed: {
    backgroundColor: Colors.primary400,  // Darken the button when pressed
  },
  disabled: {
    backgroundColor: Colors.primary100,  // Lighter color for disabled state
    opacity: 0.7,  // Added some opacity to emphasize the disabled state
  },
  buttonText: {
    textAlign: "center",
    color: Colors.secondary900,
    fontSize: 16,
    fontWeight: "bold",
  },
});