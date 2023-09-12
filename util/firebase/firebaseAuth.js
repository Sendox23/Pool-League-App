import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  reauthenticateWithCredential, EmailAuthProvider, updatePassword
} from "firebase/auth";
import { auth } from "./firebase";

export async function authenticateUser(email, password, isNewUser) {
  let userCredential;

  try {
    if (isNewUser) {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
    } else {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      await userCredential.user.reload();
    }

    return userCredential.user;
  } catch (error) {
    console.log(error);
    console.error("Firebase error: ", error.message);
    throw error;
  }
}

export const resetUserPassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently signed in.");
  }

  const cred = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, cred);
    await updatePassword(user, newPassword);
  } catch (e) {
    console.log(e.code, e.message);
    throw e;
  }
}

export function signOutUser() {
  return signOut(auth);
}

