import { DatabaseReference, child, push, ref } from "firebase/database";
import { database } from "./firebase";
import { useUserStore } from "./userRepository";
interface GroundRepository {
  getUserGrounds: () => void;
  insertGround: () => void;
}

export const useGroundRepository = (): GroundRepository => {
  const groundRef = ref(database, "grounds");
  const { user } = useUserStore();
  const getUserGrounds = async (): Promise<DatabaseReference> => {
    if (user === null) throw new Error("user is null");
    return await child(groundRef, user.uid);
  };

  const insertGround = async (): Promise<void> => {
    if (user === null) throw new Error("user is null");
    const groundUserRef = await child(groundRef, user.uid);
    push(groundUserRef, { name: "test" });
  };

  return { getUserGrounds, insertGround };
};
