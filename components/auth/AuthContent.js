import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { validateForm } from "../../helpers/authentication/validationHelper";
import { formatPhoneNumber } from "../../helpers/authentication/phoneNumberHelper";
import { handleValidationError } from "../../helpers/authentication/errorHandler";

import AuthForm from "./AuthForm";
import FlatButton from "../ui/FlatButton";
import Button from "../ui/Button";

import { AuthContext } from "../../store/context/AuthContext";
import { FormContext } from "../../store/context/FormContext";

function AuthContent({ onSubmit, isSignUp }) {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [validation, setValidation] = useState({
    email: true,
    password: true,
    confirmEmail: true,
    confirmPassword: true,
    phoneNumber: true,
    firstName: true,
    lastName: true,
  });

  useEffect(() => {
    setValidation(
      validateForm({
        ...formData,
        isSignUp,
      })
    );
  }, [formData, isSignUp]);

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handlePhoneNumberChange = (input) => {
    const currentLength = formData.phoneNumber.length;
    const newLength = input.length;
    const isDeleting = newLength < currentLength;

    if (isDeleting) {
      handleFieldChange("phoneNumber", input);
      return;
    }
    const numericInput = input.replace(/\D/g, "");
    handleFieldChange("phoneNumber", formatPhoneNumber(numericInput));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsSubmitted(true);
  
    const fieldsToCheck = isSignUp
      ? [
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "password",
          "confirmEmail",
          "confirmPassword",
        ]
      : ["email", "password"];
  
    try {
      for (const field of fieldsToCheck) {
        if (!validation[field] && !handleValidationError(field, isSignUp)) {
          return;
        }
      }
  
      let isSuccessful = false;
  
      if (isSignUp) {
        isSuccessful = await onSubmit(
          formData.email,
          formData.password,
          formData.phoneNumber,
          formData.firstName,
          formData.lastName
        );
      } else {
        isSuccessful = await onSubmit(formData.email, formData.password);
      }
  
      if (isSuccessful) {
        // Reset the form fields after successful onSubmit call
        setFormData({
          email: "",
          password: "",
          confirmEmail: "",
          confirmPassword: "",
          phoneNumber: "",
          firstName: "",
          lastName: "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  function switchAuthModeHandler() {
    if (isSignUp) {
      navigation.replace("Login");
    } else {
      navigation.replace("SignUp");
    }
  }

  return (
    <>
      <AuthForm
        isSubmitted={isSubmitted}
        validation={validation}
        handleFieldChange={handleFieldChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        formData={formData}
        isSignUp={isSignUp}
      />
      <Button onPress={handleSubmit} disabled={isLoading}>
        {isSignUp ? "Sign Up" : "Log In"}
      </Button>
      <View style={{ alignItems: "center" }}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isSignUp
            ? "Already have an account? \nLogin"
            : "Don't have an account? \nSign up"}
        </FlatButton>
      </View>
    </>
  );
}

export default AuthContent;
