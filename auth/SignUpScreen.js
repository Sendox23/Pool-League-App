import { Alert } from "react-native";
import { authenticateUser } from "../../util/firebaseAuth";
import { writeUserData } from "../../util/firebaseDb";

import AuthContent from "../../components/auth/AuthContent";
import AuthLayout from "../../components/auth/AuthLayout";

function SignUpScreen({ navigation }) {
  const handleSubmit = async (
    email,
    password,
    phoneNumber,
    firstName,
    lastName
  ) => {
    try {
      const user = await authenticateUser(email, password, true, navigation);

      if (user) {
        // Write user data to the database
        const userId = user.uid;
        writeUserData(userId, email, phoneNumber, firstName, lastName);
        navigation.replace("VerifyEmail")
        return true; // return true on success
      }
    } catch (error) {
      Alert.alert("Failed to sign up", error.message);
    }

    return false; // return false on failure
  };

  return (
    <AuthLayout headerText="Create an account">
      <AuthContent onSubmit={handleSubmit} isSignUp={true} />
    </AuthLayout>
  );
}

export default SignUpScreen;
