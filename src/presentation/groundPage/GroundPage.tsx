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
  const { getGroundById, uploadPhotos } = useGroundRepository();
  const { addSnackbar } = useSnackbarStore();
  const [ground, setGround] = useState<Ground | null>(null);
  useEffect(() => {
    const dbRef = getGroundById(groundId);
    onValue(dbRef, (snap) => {
      const val = snap.val();
      const data: Ground = {
        ...val,
        photos: val.photos == null ? null : Object.values(val.photos),
      };
      if (data == null) {
        addSnackbar({ message: "Ground not found", type: "error" });
        return;
      }
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
      <Header actions={[]} />
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
              <GroundImg
                path={photo.src}
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
