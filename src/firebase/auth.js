import { auth, provider } from "./firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

export const emailLogin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const emailSignup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const googleLogin = () => signInWithPopup(auth, provider);

export const logout = () => signOut(auth);

