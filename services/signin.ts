import * as Google from "expo-auth-session/providers/google";
import {
  signInWithCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase"; 





import { useEffect } from "react";
import { createUserDocumentIfNotExists } from "./user";



export function useGoogleSignIn() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "299820295420-d44ok0k8d9ml96louicaskpeg4eovjji.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          console.log("User signed in:", userCredential.user);
          await createUserDocumentIfNotExists(userCredential.user);
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
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocumentIfNotExists(cred.user);
  return cred;
}

export async function emailSignIn(
  email: string,
  password: string
): Promise<UserCredential> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await createUserDocumentIfNotExists(cred.user); 
  return cred;
}


export async function emailSignOut() {
  return await signOut(auth);
}


export function getCurrentUser() {
  return auth.currentUser;
}
