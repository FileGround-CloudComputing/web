import {
  UserInfo,
  signInWithRedirect,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import { create } from "zustand";

interface UserState {
  user: UserInfo | null;
  init: boolean;
}
export const useUserStore = create<UserState>()(() => ({
  user: null,
  init: false,
}));

auth.onAuthStateChanged((user) => {
  useUserStore.setState({ user, init: true });
});

interface UserRepository {
  signIn: () => void;
  signOut: () => void;
}

export const useUserRepository = (): UserRepository => {
  const signIn = () => {
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    fbSignOut(auth);
  };
  return { signIn, signOut };
};
