import {
  DatabaseReference,
  child,
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  set,
} from "firebase/database";
import { database } from "./firebase";
import { useUserStore } from "./userRepository";
import { Ground } from "@/domain/ground";
interface GroundRepository {
  getUserGrounds: () => DatabaseReference;
  insertGround: (title: string) => Promise<void>;
}

export const useGroundRepository = (): GroundRepository => {
  const groundsRef = ref(database, "grounds");
  const countRef = ref(database, "count");
  const { user } = useUserStore();
  const getUserGrounds = (): DatabaseReference => {
    if (user === null) throw new Error("user is null");
    return query(groundsRef, equalTo(user.uid)).ref;
  };

  const insertGround = async (title: string): Promise<void> => {
    if (user === null) throw new Error("user is null");

    const count = await get(countRef);
    set(countRef, count.val() + 1);
    const groundUserRef = child(groundsRef, `${count.val()}`);
    const ground: Ground = {
      title: title,
      photos: [],
      uid: user.uid,
      userDisplayName: user.displayName,
      userPhotoUrl: user.photoURL,
      createdAt: Date.now(),
    };
    set(groundUserRef, ground);
  };

  return { getUserGrounds, insertGround };
};
