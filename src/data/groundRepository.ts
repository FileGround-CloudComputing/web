import {
  DatabaseReference,
  Query,
  child,
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import { getBlob, ref as storageRef, uploadBytes } from "firebase/storage";
import { database, storage } from "./firebase";
import { useUserStore } from "./userRepository";
import { Ground } from "@/domain/ground";
import { Photo } from "@/domain/photo";
interface GroundRepository {
  getUserGrounds: () => Query;
  insertGround: (title: string) => Promise<void>;
  deleteGround: (key: string) => Promise<void>;
  getGroundById: (key: string) => DatabaseReference;
  uploadPhotos: (photos: File[], ground: Ground) => Promise<void>;
  getPhotoBlob: (path: string) => Promise<Blob>;
}

export const useGroundRepository = (): GroundRepository => {
  const { user, init } = useUserStore();

  const uploadPhotos = async (
    photos: File[],
    ground: Ground
  ): Promise<void> => {
    if (user === null) throw new Error("user is null");
    const groundsRef = ref(database, "grounds");
    const groundsStorageRef = storageRef(storage, "grounds");
    const promises = photos.map(async (photo) => {
      const photoRef = storageRef(
        groundsStorageRef,
        `${ground.key}/${photo.name}`
      );
      const uploadedPhoto = await uploadBytes(photoRef, photo);
      const ref = uploadedPhoto.ref;
      const photoDto: Photo = {
        uid: user.uid,
        userDisplayName: user.displayName,
        userPhotoUrl: user.photoURL,
        src: ref.fullPath,
        thumbnail: ref.fullPath,
      };
      push(child(groundsRef, `${ground.key}/photos`), photoDto);
      return uploadedPhoto.ref.fullPath;
    });
    await Promise.all(promises);
  };
  const getUserGrounds = (): Query => {
    if (user === null) throw new Error("user is null");
    const groundsRef = ref(database, "grounds");
    return query(groundsRef, orderByChild("uid"), equalTo(user.uid));
  };

  const getPhotoBlob = async (path: string): Promise<Blob> => {
    return await getBlob(storageRef(storage, path));
  };
  const getGroundById = (key: string): DatabaseReference => {
    const groundsRef = ref(database, "grounds");
    if (user === null && init) throw new Error("user is null");

    return child(groundsRef, `${Number.parseInt(key)}`);
  };

  const deleteGround = async (key: string): Promise<void> => {
    if (user === null && init) throw new Error("user is null");
    const groundsRef = ref(database, "grounds");
    const groundRef = child(groundsRef, `${Number.parseInt(key)}`);
    await set(groundRef, null);
    return;
  };
  const insertGround = async (title: string): Promise<void> => {
    if (user === null) throw new Error("user is null");
    const countRef = ref(database, "count");
    const groundsRef = ref(database, "grounds");
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

  return {
    getUserGrounds,
    insertGround,
    deleteGround,
    getGroundById,
    uploadPhotos,
    getPhotoBlob,
  };
};
