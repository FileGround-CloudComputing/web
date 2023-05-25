import { useGroundRepository } from "@/data/groundRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CONNECT_PATH } from "@/domain/paths";
import { off, onValue } from "firebase/database";
import { Ground } from "@/domain/ground";
import { Header } from "../commons/components/Header";
import { pageStyles } from "../commons/atomics/styles/page";
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
  }, [getGroundById, groundId, addSnackbar, getPhotoUrl]);
  if (ground == null) {
    return <></>;
  }
  return (
    <>
      <Header actions={[<GroundMenu />]} />
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

export const PhotoList = ({ photos }: PhotoListByUserProps): ReactElement => {
  return (
    <div
      key={photos[0].uid}
      css={css`
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        row-gap: 8px;
        column-gap: 8px;
      `}
    >
      {photos.map((photo) => (
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
  );
};
interface PhotoListByUserProps {
  photos: Photo[];
}
export const PhotoListByUser = ({
  photos,
}: PhotoListByUserProps): ReactElement => {
  const photoRecord: Map<string, Photo[]> = new Map();
  photos.forEach((photo) => {
    if (photoRecord.get(photo.uid) == null) {
      photoRecord.set(photo.uid, []);
    }
    const record = photoRecord.get(photo.uid);
    if (record) {
      record.push(photo);
    }
  });
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
      `}
    >
      {[...photoRecord.values()].map((photos) => (
        <div
          key={photos[0].uid}
          css={(theme) => css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding-bottom: 8px;
            border-top: 2px solid ${theme.colors.darkShadow};
            border-bottom: 2px solid ${theme.colors.darkShadow};
          `}
        >
          <div
            css={(theme) => css`
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px 0px;
              border-bottom: 1px solid ${theme.colors.darkShadow};
            `}
          >
            <Img
              src={
                photos[0].userPhotoUrl === null
                  ? undefined
                  : photos[0].userPhotoUrl
              }
              css={(theme) => css`
                width: 32px;
                height: 32px;
                border-radius: 100%;
                ${normalShapeStyles({ theme, size: 2 })}
              `}
            />
            <span>{photos[0].userDisplayName}</span>
          </div>

          <PhotoList photos={photos} />
        </div>
      ))}
    </div>
  );
};
