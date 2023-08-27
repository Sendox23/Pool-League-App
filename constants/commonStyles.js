import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const signUpLoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary900,
    borderColor: "#49270e",
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  content: {
    paddingHorizontal: 36,
    paddingVertical: 20,
    backgroundColor: Colors.primary800,
    borderColor: "#49270e",
    borderWidth: 6,
    borderRadius: 10,
    width: "100%",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: Colors.primary50,
  },
});

export const commonScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary800,
  },
  content: {
    paddingHorizontal: 36,
    paddingVertical: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: Colors.primary50,
  },
  text: {
    fontSize: 16,
    color: Colors.primary50,
    textAlign: "center",
    marginBottom: 12,
  },
});
