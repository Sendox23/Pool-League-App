import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
  } from "firebase/auth";
  import { auth } from "./firebase";
  import { getErrorMessage } from "../../helpers/errorHandler"
  
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
      const errorMessage = getErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  }
  
  export function signOutUser() {
    return signOut(auth);
  }
  