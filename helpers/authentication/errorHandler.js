import { Alert } from "react-native";

const errorMessages = {
  "auth/email-not-verified": "Please verify your email before signing in.",
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/operation-not-allowed": "Email/password accounts are not enabled.",
  "auth/user-disabled": "This user has been disabled. Please contact support.",
  "auth/user-not-found":
    "The email or password is incorrect, please try again.",
  "auth/wrong-password":
    "The email or password is incorrect, please try again.",
  "auth/missing-password":
    "The email or password is incorrect, please try again.",
  firstName: "First Name cannot be empty.",
  lastName: "Last Name cannot be empty.",
  email: "Please enter a valid email address.",
  emailLogin: "The email or password is incorrect, please try again.",
  phoneNumber: "Please enter a valid phone number in the format (XXX)XXX-XXXX.",
  password:
    "Password must meet the following requirements:\n" +
    "- At least 8 characters long.\n" +
    "- Contains a capital letter.\n" +
    "- Contains a number.\n" +
    "- Contains a special character.",
  passwordLogin: "The email or password is incorrect, please try again.",
  confirmEmail: "Please make sure your emails match.",
  confirmPassword: "Please make sure your passwords match.",
};

export function getErrorMessage(code) {
  return errorMessages[code] || "Authentication Failed. Please try again.";
}

export function handleValidationError(field, isSignUp) {
  const signUpOnlyFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "confirmEmail",
    "confirmPassword",
  ];

  if (field === "email" || field === "password") {
    let errorMessage = errorMessages[field + (isSignUp ? "" : "Login")];
    if (errorMessage) {
      Alert.alert("Error logging in", errorMessage);
      console.log("Error logging in, " + errorMessage);
      return false;
    }
  } else if (isSignUp || (!isSignUp && !signUpOnlyFields.includes(field))) {
    if (errorMessages[field]) {
      Alert.alert("Sign up error", errorMessages[field]);
      console.log("Sign up error, " + errorMessages[field]);
      return false;
    }
  }

  return true;
}
