import {
  UserInfo,
  signInWithRedirect,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: UserInfo | null;
  init: boolean;
}
export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    init: false,
  }))
);

auth.onAuthStateChanged((user) => {
  useUserStore.setState({ user, init: true });
});

interface UserRepository {
  signIn: () => void;
  signOut: () => void;
}

export const useUserRepository = () => {
  const signIn = () => {
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    fbSignOut(auth);
  };
  return { signIn, signOut };
};
