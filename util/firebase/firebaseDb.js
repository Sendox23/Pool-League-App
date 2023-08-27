import { ref, set } from "firebase/database";
import { database } from "./firebase";

export async function writeUserData(userId, email, phoneNumber, firstName, lastName) {
  try {
    await set(ref(database, "users/" + userId), {
      email: email,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to save user data. Please try again.");
  }
}