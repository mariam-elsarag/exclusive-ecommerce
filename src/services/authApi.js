import { auth } from "./firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
export async function createUser(userName, email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: userName });
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to create account. Please try again.");
  }
}
