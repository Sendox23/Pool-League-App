import React, { useState } from "react";
import {
  Modal,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Input from "../auth/Input";
import { resetUserPassword } from "../../util/firebase/firebaseAuth";
import { getErrorMessage } from "../../helpers/authentication/errorHandler";
import LoadingOverlay from "../ui/LoadingOverlay";

export default function ChangePasswordModal({ visible, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onCloseHandler() {
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    onClose();
  }
  const isValidPassword = (password) => {
    // Regex pattern for checking password complexity
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleChangePassword = async () => {
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    if (!newPassword || !confirmPassword || !currentPassword) {
      const message = "This field is required.";
      if (!currentPassword) setCurrentPasswordError(message);
      if (!newPassword) setNewPasswordError(message);
      if (!confirmPassword) setConfirmPasswordError(message);
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      setNewPasswordError(
        "New Password must meet the following requirements:\n" +
          "- At least 8 characters long.\n" +
          "- Contains a capital letter.\n" +
          "- Contains a number.\n" +
          "- Contains a special character."
      );
      return;
    }

    setIsLoading(true);

    try {
      await resetUserPassword(currentPassword, newPassword);
      Alert.alert("Success", "Password changed successfully");

      onCloseHandler();
    } catch (error) {
      // Assuming the error.code is in the format you provided
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", getErrorMessage("passwordLogin"));
      } else {
        Alert.alert("Error", getErrorMessage(error.code));
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const errorStyleOptions = {
    input: {
      borderColor: "red",
      borderWidth: 2,
      backgroundColor: "#FFEBEE",
    },
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCloseHandler}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onCloseHandler}
      >
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
          <Text style={styles.headerText}>Update Password</Text>
          <Input
            type="password"
            value={currentPassword}
            setter={setCurrentPassword}
            placeholder="Current Password"
            styleOptions={currentPasswordError ? errorStyleOptions : {}}
          />
          {currentPasswordError ? (
            <Text style={styles.errorText}>{currentPasswordError}</Text>
          ) : null}
          <Input
            type="password"
            value={newPassword}
            setter={setNewPassword}
            placeholder="New Password"
            styleOptions={newPasswordError ? errorStyleOptions : {}}
          />
          {newPasswordError ? (
            <Text style={styles.errorText}>{newPasswordError}</Text>
          ) : null}
          <Input
            type="password"
            value={confirmPassword}
            setter={setConfirmPassword}
            placeholder="Confirm New Password"
            styleOptions={confirmPasswordError ? errorStyleOptions : {}}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleChangePassword} />
            <Button title="Cancel" onPress={onCloseHandler} color="red" />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: 300,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 30,
    backgroundColor: "#cae2e6",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 5,
    width: 250, // You can adjust this based on your design needs
  },
});
