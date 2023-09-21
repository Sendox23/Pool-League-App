import { writeData, buildRef, fetchData } from "./firebase-utils";

// Write user data to Firebase
export const writeUserData = async (
  userId,
  email,
  phoneNumber,
  firstName,
  lastName
) => {
  await writeData(buildRef(`users/${userId}`), {
    email,
    phoneNumber,
    firstName,
    lastName,
  });
};

// Fetch a user's details from the Firebase database
export const fetchUserDetailsFromDatabase = async (userId) =>
  fetchData(buildRef(`users/${userId}`));
