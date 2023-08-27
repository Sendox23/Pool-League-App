import { Alert } from "react-native";
import { authenticateUser } from "../../util/firebaseAuth";

import AuthContent from "../../components/auth/AuthContent";
import AuthLayout from "../../components/auth/AuthLayout";

function LoginScreen({ navigation }) {
  const handleSubmit = async (email, password) => {
    try {
      const user = await authenticateUser(email, password, false, navigation);

      if (user && !user.emailVerified) {
        navigation.replace("VerifyEmail");
        return true; // return true on success
      }
    } catch (error) {
      Alert.alert("Failed to authenticate", error.message);
    }

    return false; // return false on failure
  };

  return (
    <AuthLayout headerText="Login to your account">
      <AuthContent onSubmit={handleSubmit} isSignUp={false} />
    </AuthLayout>
  );
}

export default LoginScreen;
