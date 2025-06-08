import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../lib/firebase';



export const emailSignUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
}
export const emailSignIn = async ( email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
};

export const emailSignOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
}
export const isUserSignedIn = () => {
    return auth.currentUser !== null;
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const googleSignIn = async () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);
        return result.user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
