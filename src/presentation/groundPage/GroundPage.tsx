import { useGroundRepository } from "@/data/groundRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CONNECT_PATH } from "@/domain/paths";
import { off, onValue } from "firebase/database";
import { Ground } from "@/domain/ground";
import { Header } from "../commons/components/Header";
import { pageStyles } from "../commons/atomics/styles/page";
import { Photo } from "@/domain/photo";
import { GroundMenu } from "./patterns/GroundMenu";
import { PhotoListByUser } from "./patterns/PhotoList";
import { css } from "@emotion/react";
import { titleStyles1 } from "../commons/atomics/typo";
import { Button } from "../commons/components/Button";

export const GroundPageEnter = (): ReactElement => {
  const { groundId, password } = useParams();
  const navigate = useNavigate();
  if (groundId == null) {
    navigate(CONNECT_PATH);
    return <></>;
  }
  return <GroundPage groundId={groundId} password={password} />;
};

interface GroundPageProps {
  groundId: string;
  password?: string;
}
export const GroundPage = ({
  groundId,
  password,
}: GroundPageProps): ReactElement => {
  const { getGroundById, uploadPhotos, getPhotoBlob } = useGroundRepository();
  const { addSnackbar } = useSnackbarStore();
  const [ground, setGround] = useState<Ground | null>(null);
  useEffect(() => {
    const dbRef = getGroundById(groundId, password);
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
  const ref = useRef<HTMLInputElement>(null);
  if (ground == null) {
    return <></>;
  }
  return (
    <>
      <Header actions={[<GroundMenu key={1} ground={ground} />]} />
      <div css={[pageStyles]}>
        <span
          css={(theme) => css`
            ${titleStyles1}
            color: ${theme.colors.onBackground};
          `}
        >
          {ground.userDisplayName}의 {ground.title}
        </span>
        {ground.photos != null && <PhotoListByUser photos={ground.photos} />}
        <Button
          onClick={() => {
            ref.current?.click();
          }}
        >
          업로드하기
        </Button>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.currentTarget.files == null) return;
            uploadPhotos([...e.currentTarget.files], ground);
          }}
          ref={ref}
          hidden
        />
      </div>
    </>
  );
};
