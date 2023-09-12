import { Alert } from "react-native";

// Firebase utilities
import { authenticateUser } from "../../util/firebase/firebaseAuth";
import { writeUserData } from "../../util/firebase/firebaseDb";

// Components
import AuthContent from "../../components/auth/AuthContent";
import AuthLayout from "../../components/auth/AuthLayout";

function SignUpScreen({ navigation }) {
  
  /**
   * Handles the sign-up process, including:
   * - Authenticating the user with Firebase Authentication
   * - Saving user details in the Firebase Realtime Database
   * - Navigating to the email verification screen
   */
  const handleSubmit = async (email, password, phoneNumber, firstName, lastName) => {
    try {
      const user = await authenticateUser(email, password, true);

      if (user) {
        const userId = user.uid;

        // Removing the password from the function call
        await writeUserData(userId, email, phoneNumber, firstName, lastName);

        navigation.replace("VerifyEmail");
        return true;
      }
    } catch (error) {
      Alert.alert("Failed to sign up", error.message);
    }

    return false;
  };

  return (
    <AuthLayout headerText="Create an account">
      <AuthContent onSubmit={handleSubmit} isSignUp={true} />
    </AuthLayout>
  );
}

export default SignUpScreen;