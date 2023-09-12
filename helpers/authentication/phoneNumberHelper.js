export const formatPhoneNumber = (numericInput) => {
  const areaCode = numericInput.slice(0, 3);
  const mainDigits = numericInput.slice(3, 10);
  let formattedPhoneNumber = "";
  if (areaCode) {
    formattedPhoneNumber += `(${areaCode})`;
  }
  if (mainDigits) {
    formattedPhoneNumber += `${mainDigits.slice(0, 3)}-${mainDigits.slice(3)}`;
  }
  return formattedPhoneNumber;
};
