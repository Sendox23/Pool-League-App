import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import InfoItem from "./InfoItem";
import ChangePasswordModal from "./ChangePasswordModal";

import { AuthContext } from "../../store/context/AuthContext";

export default function Profile() {
  const userCtx = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <InfoItem label="First Name:" value={userCtx.firstName} />
      <InfoItem label="Last Name:" value={userCtx.lastName} />
      <InfoItem label="Email:" value={userCtx.email} />
      <InfoItem label="Phone:" value={userCtx.phoneNumber} />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>
      <ChangePasswordModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f8",
    marginTop: 30,
  },
  changePasswordText: { color: "blue", marginTop: 20, textAlign: "center" },
});
