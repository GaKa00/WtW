import * as Google from "expo-auth-session/providers/google";
import {
  signInWithCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase"; // Update the path as needed




import { useEffect } from "react";



export function useGoogleSignIn() {
  // Replace with your Web Client ID from Firebase Console
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "299820295420-d44ok0k8d9ml96louicaskpeg4eovjji.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  return { promptAsync, request };
}

export async function emailSignUp(
  email: string,
  password: string
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
}


export async function emailSignIn(
  email: string,
  password: string
): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}


export async function emailSignOut() {
  return await signOut(auth);
}


export function getCurrentUser() {
  return auth.currentUser;
}
