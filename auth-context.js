"use client";

import { createContext } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
export const authContext = createContext({
  user: null,
  loading: false,
  googleLogInHandler: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider(auth);
  const googleLogInHandler = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const newUser = userCredentials.user;
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: newUser.email,
        name: newUser.displayName,
        provider: userCredentials.user.providerData[0].providerId,
        photoUrl: newUser.photoURL,
      });
      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };
  // const gitHubLogInHandler = async () => {
  //   try {
  //     await signInWithPopup(auth, githubProbider);
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  const logout = () => {
    signOut(auth);
    router.push("/");
  };
  const values = {
    user,
    loading,
    googleLogInHandler,

    logout,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
