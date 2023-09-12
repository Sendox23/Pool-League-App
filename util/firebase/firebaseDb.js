import { get, ref, set } from "firebase/database";
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
export async function fetchUserDetailsFromDatabase(userId) {
  try {
    const userRef = ref(database, "users/" + userId);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      console.log(snapshot.val())
      return snapshot.val();
    } else {
      console.log("No user data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

