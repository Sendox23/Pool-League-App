import { useContext } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { signOutUser } from "../../util/firebaseAuth";
import { auth } from "../../util/firebase";
import { commonScreenStyle } from "../../constants/commonStyles";

import Button from "../../components/ui/Button";
import { AuthContext } from "../../store/context/AuthContext";

function VerifyEmailScreen({ navigation }) {
  const { setUser, setIsAuthenticated, isLoading, setIsLoading } =
    useContext(AuthContext);

  async function signOutHandler() {
    setIsLoading(true);
    try {
      await signOutUser();
      console.log("User signed out");
      navigation.replace("Login");
    } catch (error) {
      console.log("Failed to sign out user:", error);
      Alert.alert("Failed to sign out", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function checkEmailVerification() {
    setIsLoading(true);
    const user = auth.currentUser;
    try {
      await user.reload();
      if (user.emailVerified) {
        setUser(user); // Updating the user in context will trigger a re-render
        setIsAuthenticated(true); // Also, we update isAuthenticated to be true
      } else {
        Alert.alert(
          "Email not verified",
          "Please verify your email before continuing."
        );
      }
    } catch (error) {
      console.log("Failed to reload user:", error);
      Alert.alert("Failed to reload user", error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View style={commonScreenStyle.container}>
      <View style={commonScreenStyle.content}>
        <Text style={commonScreenStyle.header}>Verify Your Email</Text>
        <Text style={commonScreenStyle.text}>
          Please check your inbox for the verification email and click the link
          to verify your account.
        </Text>
        <View style={styles.buttonContainer}>
          <Button onPress={checkEmailVerification} disabled={isLoading}>
            I am Verified
          </Button>
          <Button onPress={signOutHandler} disabled={isLoading}>
            Sign Out
          </Button>
        </View>
      </View>
    </View>
  );
}

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    marginHorizontal: 10,
  },
});
