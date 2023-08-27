import React, { createContext, useState } from "react";

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmEmail: "",
    confirmPassword: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}
