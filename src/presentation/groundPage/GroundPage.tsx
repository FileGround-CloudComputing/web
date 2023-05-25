import { useGroundRepository } from "@/data/groundRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CONNECT_PATH } from "@/domain/paths";
import { off, onValue } from "firebase/database";
import { Ground } from "@/domain/ground";
import { Header } from "../commons/components/Header";
import { pageStyles } from "../commons/atomics/styles/page";
import { GroundImg } from "../commons/components/GroundImg";
import { css } from "@emotion/react";
import { normalShapeStyles } from "../commons/atomics/styles/shape";
import { Photo } from "@/domain/photo";
import { Img } from "../commons/components/Img";
import { GroundMenu } from "./patterns/GroundMenu";

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
  const { getGroundById, uploadPhotos, getPhotoUrl } = useGroundRepository();
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
          const src = await getPhotoUrl(photo.src);
          return {
            ...photo,
            src: src,
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
  }, [getGroundById, groundId, addSnackbar]);
  if (ground == null) {
    return <></>;
  }
  return (
    <>
      <Header actions={[<GroundMenu ground={ground} />]} />
      <div css={[pageStyles]}>
        <span>{ground.title}</span>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            row-gap: 8px;
            column-gap: 8px;
          `}
        >
          {ground.photos != null &&
            ground.photos.map((photo) => (
              <Img
                src={photo.src}
                css={(theme) => css`
                  width: 100%;
                  object-fit: cover;
                  aspect-ratio: 1;
                  border-radius: 8px;
                  ${normalShapeStyles({ theme, size: 2 })}
                `}
                key={photo.src}
              />
            ))}
        </div>
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
