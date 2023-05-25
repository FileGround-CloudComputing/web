import { useGroundRepository } from "@/data/groundRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CONNECT_PATH } from "@/domain/paths";
import { off, onValue } from "firebase/database";
import { Ground } from "@/domain/ground";
import { Header } from "../commons/components/Header";
import { pageStyles } from "../commons/atomics/styles/page";
import { Photo } from "@/domain/photo";
import { GroundMenu } from "./patterns/GroundMenu";
import { PhotoListByUser } from "./patterns/PhotoList";

export const GroundPageEnter = (): ReactElement => {
  const { groundId } = useParams();
  const navigate = useNavigate();
  if (groundId == null) {
    navigate(CONNECT_PATH);
    return <></>;
  }
  return <GroundPage groundId={groundId} />;
};

interface GroundPageProps {
  groundId: string;
}
export const GroundPage = ({ groundId }: GroundPageProps): ReactElement => {
  const { getGroundById, uploadPhotos, getPhotoBlob } = useGroundRepository();
  const { addSnackbar } = useSnackbarStore();
  const [ground, setGround] = useState<Ground | null>(null);
  useEffect(() => {
    const dbRef = getGroundById(groundId);
    onValue(dbRef, async (snap) => {
      const val = snap.val();

      if (val == null) {
        addSnackbar({ message: "Ground not found", type: "error" });
        return;
      }
      if (val.photos == null) {
        setGround(val);
        return;
      }
      const photos = await Promise.all(
        Object.values(val.photos as Photo[]).map(async (photo: Photo) => {
          const blob = await getPhotoBlob(photo.src);
          return {
            ...photo,
            blob: blob,
          };
        })
      );
      const data: Ground = {
        ...val,
        photos: photos,
      };
      setGround(data);
    });
    return () => {
      off(dbRef);
    };
  }, []);
  if (ground == null) {
    return <></>;
  }
  return (
    <>
      <Header actions={[<GroundMenu key={1} ground={ground} />]} />
      <div css={[pageStyles]}>
        <span>{ground.title}</span>
        {ground.photos != null && <PhotoListByUser photos={ground.photos} />}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.currentTarget.files == null) return;
            uploadPhotos([...e.currentTarget.files], ground);
          }}
        />
      </div>
    </>
  );
};
