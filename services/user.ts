import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { User } from "firebase/auth";

export const createUserDocumentIfNotExists = async (user: User) => {
  const userRef = doc(db, "user", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const { email, displayName } = user;

    await setDoc(userRef, {
      email: email || "",
      name: displayName || "",
    });

    console.log("Created user document for:", email);
  } else {
    console.log("User document already exists");
  }
};
