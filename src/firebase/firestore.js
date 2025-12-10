import { db } from "./firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveUserData = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};

export const getUserData = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

