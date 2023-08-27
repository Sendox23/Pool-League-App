import { View, StyleSheet } from "react-native";

import Input from "./Input";
import { Colors } from "../../constants/colors";


function AuthForm({
  isSubmitted,
  validation,
  handleFieldChange,
  handlePhoneNumberChange,
  formData,
  isSignUp,
}) {
  const [
    email,
    password,
    confirmEmail,
    confirmPassword,
    phoneNumber,
    firstName,
    lastName,
  ] = [
    formData.email,
    formData.password,
    formData.confirmEmail,
    formData.confirmPassword,
    formData.phoneNumber,
    formData.firstName,
    formData.lastName,
  ];

  return (
    <View>
      {isSignUp && (
        <Input
          autoCapitalize="words"
          autoComplete="given-name"
          styleOptions={styles}
          isSubmitted={isSubmitted}
          isValid={validation.firstName}
          setter={(value) => handleFieldChange("firstName", value)}
          value={firstName}
          placeholder="First Name"
          type="text"
          isSignUp={isSignUp}
        />
      )}
      {isSignUp && (
        <Input
          autoCapitalize="words"
          autoComplete="family-name"
          styleOptions={styles}
          isSubmitted={isSubmitted}
          isValid={validation.lastName}
          setter={(value) => handleFieldChange("lastName", value)}
          value={lastName}
          placeholder="Last Name"
          type="text"
          isSignUp={isSignUp}
        />
      )}
      <Input
        autoComplete="email"
        styleOptions={styles}
        isSubmitted={isSubmitted}
        isValid={validation.email}
        setter={(value) => handleFieldChange("email", value)}
        value={email}
        keyboardType="email-address"
        placeholder="Email"
        type="email"
        isSignUp={isSignUp}
      />
      {isSignUp && (
        <Input
          autoComplete="email"
          styleOptions={styles}
          isSubmitted={isSubmitted}
          isValid={validation.confirmEmail} // Updated validation prop
          setter={(value) => handleFieldChange("confirmEmail", value)} // Updated setter
          value={confirmEmail} // Updated value
          keyboardType="email-address"
          placeholder="Confirm Email" // Updated placeholder
          type="email"
          isSignUp={isSignUp}
        />
      )}
      {isSignUp && (
        <Input
          autoComplete="tel"
          styleOptions={styles}
          isSubmitted={isSubmitted}
          isValid={validation.phoneNumber}
          setter={handlePhoneNumberChange}
          value={phoneNumber}
          keyboardType="phone-pad"
          placeholder="Phone Number (XXX)XXX-XXXX"
          type="phone"
          isSignUp={isSignUp}
        />
      )}
      <Input
        styleOptions={styles}
        isSubmitted={isSubmitted}
        isValid={validation.password}
        setter={(value) => handleFieldChange("password", value)}
        value={password}
        placeholder="Password"
        type="password"
        isSignUp={isSignUp}
      />
      {isSignUp && (
        <>
          <Input
            styleOptions={styles}
            isSubmitted={isSubmitted}
            isValid={validation.confirmPassword}
            setter={(value) => handleFieldChange("confirmPassword", value)}
            value={confirmPassword}
            placeholder="Confirm Password"
            type="password"
            isSignUp={isSignUp}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: Colors.primary50,
    borderColor: Colors.secondary300,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 7,
  },
  focus: {
    borderColor: Colors.primary300,
    backgroundColor: "white",
  },
  error: {
    borderColor: Colors.error500,
    backgroundColor: Colors.error100,
  },
});

export default AuthForm;
