import {
  DatabaseReference,
  Query,
  child,
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import {
  deleteObject,
  getBlob,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "./firebase";
import { useUserStore } from "./userRepository";
import { Ground } from "@/domain/ground";
import { Photo } from "@/domain/photo";
interface GroundRepository {
  getUserGrounds: () => Query;
  insertGround: (title: string, password?: string) => Promise<string>;
  deleteGround: (id: string, password?: string) => Promise<void>;
  getGroundById: (id: string, password?: string) => DatabaseReference;
  uploadPhotos: (photos: File[], ground: Ground) => Promise<void>;
  getPhotoBlob: (path: string) => Promise<Blob>;
  deletePhoto: (photo: Photo) => Promise<void>;
  likePhoto: (ground: Ground, photo: Photo) => Promise<void>;
  unlikePhoto: (ground: Ground, photo: Photo) => Promise<void>;
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
      const id = encodeURI(`${Date.now()}${photo.name}`).replace(/\./g, "");
      const photoRef = storageRef(groundsStorageRef, `${ground.id}/${id}`);
      const uploadedPhoto = await uploadBytes(photoRef, photo);
      const ref = uploadedPhoto.ref;

      const photoDto: Photo = {
        groundId: ground.id.toString(),
        uid: user.uid,
        userDisplayName: user.displayName,
        userPhotoUrl: user.photoURL,
        src: ref.fullPath,
        thumbnail: ref.fullPath,
        id: id,
        likes: new Map<string, boolean>(),
      };

      if (ground.password == undefined) {
        set(child(groundsRef, `${ground.id}/photos/${id}`), photoDto);
      } else {
        set(
          child(groundsRef, `${ground.id}-${ground.password}/photos/${id}`),
          photoDto
        );
      }
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
  const getGroundById = (id: string, password?: string): DatabaseReference => {
    if (user === null && init) throw new Error("user is null");
    if (password == null) {
      const groundsRef = ref(database, "grounds");
      return child(groundsRef, `${Number.parseInt(id)}`);
    } else {
      const groundsRef = ref(database, "grounds");
      return child(groundsRef, `${Number.parseInt(id)}-${password}`);
    }
  };

  const deleteGround = async (id: string, password?: string): Promise<void> => {
    if (user === null && init) throw new Error("user is null");
    const groundsRef = ref(database, "grounds");
    if (password == null) {
      const groundRef = child(groundsRef, `${Number.parseInt(id)}`);
      await set(groundRef, null);
    } else {
      const groundRef = child(groundsRef, `${Number.parseInt(id)}-${password}`);
      await set(groundRef, null);
    }
    return;
  };
  const deletePhoto = async (photo: Photo): Promise<void> => {
    if (user === null && init) throw new Error("user is null");
    if (photo.id === undefined) throw new Error("photo.id is undefined");
    const postRef = ref(database, `grounds/${photo.groundId}`);

    const photoStorageRef = storageRef(
      storage,
      `grounds/${photo.groundId}/${photo.id}`
    );
    await remove(child(postRef, `photos/${photo.id}`));
    await deleteObject(photoStorageRef);
    return;
  };
  const likePhoto = async (ground: Ground, photo: Photo): Promise<void> => {
    if (user === null) throw new Error("user is null");

    const groundRef = getGroundById(ground.id.toString(), ground.password);
    await set(child(groundRef, `photos/${photo.id}/likes/${user.uid}`), true);
  };
  const unlikePhoto = async (ground: Ground, photo: Photo): Promise<void> => {
    if (user === null) throw new Error("user is null");

    const groundRef = getGroundById(ground.id.toString(), ground.password);
    await set(child(groundRef, `photos/${photo.id}/likes/${user.uid}`), null);
  };
  const insertGround = async (
    title: string,
    password?: string
  ): Promise<string> => {
    if (user === null) throw new Error("user is null");
    const countRef = ref(database, "count");
    const groundsRef = ref(database, "grounds");
    const count = (await get(countRef)).val() as number;
    set(countRef, count + 1);

    const ground: Ground = {
      title: title,
      photos: [],
      uid: user.uid,
      userDisplayName: user.displayName,
      userPhotoUrl: user.photoURL,
      createdAt: Date.now(),
      id: count,
    };
    if (password != undefined) {
      const groundUserRef = child(groundsRef, `${count}-${password}`);
      ground.password = password;
      set(groundUserRef, ground);
      return `${count}/${password}`;
    } else {
      const groundUserRef = child(groundsRef, `${count}`);
      set(groundUserRef, ground);
      return `${count}`;
    }
  };

  return {
    getUserGrounds,
    insertGround,
    deleteGround,
    getGroundById,
    uploadPhotos,
    getPhotoBlob,
    deletePhoto,
    likePhoto,
    unlikePhoto,
  };
};
