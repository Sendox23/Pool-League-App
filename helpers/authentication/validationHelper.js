function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function validatePhoneNumber(phoneNumber) {
  return /^\(\d{3}\)\d{3}-\d{4}$/.test(phoneNumber);
}

function validatePassword(password) {
  return (
    password.length >= 8 && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+/.test(password)
  );
}

export const validateForm = ({
  email,
  phoneNumber,
  firstName,
  lastName,
  password,
  confirmEmail, // New parameter
  confirmPassword,
  isSignUp,
}) => {
  return {
    email: validateEmail(email),
    phoneNumber: validatePhoneNumber(phoneNumber),
    firstName: firstName.trim().length > 0,
    lastName: lastName.trim().length > 0,
    password: validatePassword(password),
    confirmEmail: isSignUp
      ? email.toLowerCase() === confirmEmail.toLowerCase() &&
        confirmEmail.length > 0
      : true, // New field validation
    confirmPassword: isSignUp
      ? password === confirmPassword && confirmPassword.length > 0
      : true,
  };
};
