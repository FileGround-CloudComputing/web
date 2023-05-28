import { Photo } from "@/domain/photo";
import { normalShapeStyles } from "@/presentation/commons/atomics/styles/shape";
import { Img } from "@/presentation/commons/components/Img";
import { css } from "@emotion/react";
import { ReactElement, useState } from "react";
import { PhotoListMenu } from "./PhotoListMenu";
import { PhotoListModal } from "./PhotoListModal";
import { Ground } from "@/domain/ground";

export const PhotoList = ({
  photos,
  ground,
}: PhotoListByUserProps): ReactElement => {
  const [modalOpen, setModalOpen] = useState(-1);
  const [idx, setIdx] = useState(0);
  const handleClose = () => setModalOpen(-1);
  return (
    <>
      {modalOpen != -1 && (
        <PhotoListModal
          idx={idx}
          handleClose={handleClose}
          setIdx={setIdx}
          photos={photos}
          modalOpen={modalOpen}
          ground={ground}
        />
      )}
      <div
        key={photos[0].uid}
        css={css`
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          row-gap: 8px;
          column-gap: 8px;
        `}
      >
        {photos.map((photo, idx) => (
          <Img
            src={photo.blob == null ? "" : URL.createObjectURL(photo.blob)}
            css={(theme) => css`
              width: 100%;
              object-fit: cover;
              aspect-ratio: 1;
              border-radius: 8px;
              cursor: pointer;
              ${normalShapeStyles({ theme, size: 2 })}
            `}
            onClick={() => {
              setModalOpen(idx);
            }}
            key={photo.src}
          />
        ))}
      </div>
    </>
  );
};
interface PhotoListByUserProps {
  photos: Photo[];
  ground: Ground;
}
export const PhotoListByUser = ({
  photos,
  ground,
}: PhotoListByUserProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(true);
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
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding-bottom: 8px;
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
                ${normalShapeStyles({ theme, size: 1 })}
              `}
            />
            <span>{photos[0].userDisplayName}</span>
            <div
              css={css`
                flex: 1;
              `}
            />
            <PhotoListMenu
              photos={photos}
              isOpen={isOpen}
              toggleIsOpen={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>

          {isOpen && <PhotoList photos={photos} ground={ground} />}
        </div>
      ))}
    </div>
  );
};
