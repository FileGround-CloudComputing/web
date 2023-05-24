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
  deleteGround: (key: number) => Promise<void>;
}

export const useGroundRepository = (): GroundRepository => {
  const groundsRef = ref(database, "grounds");
  const countRef = ref(database, "count");
  const { user } = useUserStore();
  const getUserGrounds = (): DatabaseReference => {
    if (user === null) throw new Error("user is null");
    return query(groundsRef, equalTo(user.uid)).ref;
  };

  const deleteGround = async (key: number): Promise<void> => {
    if (user === null) throw new Error("user is null");
    const groundRef = child(groundsRef, `${key}`);
    await set(groundRef, null);
    return;
  };
  const insertGround = async (title: string): Promise<void> => {
    if (user === null) throw new Error("user is null");

    const count = (await get(countRef)).val() as number;
    set(countRef, count + 1);
    const groundUserRef = child(groundsRef, `${count}`);
    const ground: Ground = {
      title: title,
      photos: [],
      uid: user.uid,
      userDisplayName: user.displayName,
      userPhotoUrl: user.photoURL,
      createdAt: Date.now(),
      key: count,
    };
    set(groundUserRef, ground);
  };

  return { getUserGrounds, insertGround, deleteGround };
};
