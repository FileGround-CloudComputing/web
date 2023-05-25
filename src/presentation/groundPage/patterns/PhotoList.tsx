import { Photo } from "@/domain/photo";
import { normalShapeStyles } from "@/presentation/commons/atomics/styles/shape";
import { Img } from "@/presentation/commons/components/Img";
import { css } from "@emotion/react";
import { ReactElement } from "react";
import { PhotoListMenu } from "./PhotoListMenu";

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
          src={photo.blob == null ? "" : URL.createObjectURL(photo.blob)}
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
            <PhotoListMenu photos={photos} />
          </div>

          <PhotoList photos={photos} />
        </div>
      ))}
    </div>
  );
};
