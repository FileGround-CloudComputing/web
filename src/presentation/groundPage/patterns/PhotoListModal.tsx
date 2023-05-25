import { IconButton } from "@/presentation/commons/components/IconButton";
import { Modal } from "@/presentation/commons/patterns/Modal";
import { css } from "@emotion/react";
import { ReactElement } from "react";
import { PhotoSwiper } from "./PhotoSwiper";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Photo } from "@/domain/photo";
interface PhotoListModalProps {
  photos: Photo[];
  modalOpen: number;
  setIdx: (idx: number) => void;
  handleClose: () => void;
  idx: number;
}
export const PhotoListModal = ({
  photos,
  modalOpen,
  idx,
  setIdx,
  handleClose,
}: PhotoListModalProps): ReactElement => {
  return (
    <Modal
      handleClose={handleClose}
      css={css`
        width: 90%;
        max-width: 50vh;
        aspect-ratio: 1;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: end;
          gap: 16px;
        `}
      >
        <IconButton
          shadowSize={2}
          onClick={() => {
            const photo = photos[idx];
            if (photo.blob == null) return;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(photo.blob);
            link.download = photo.src;
            link.click();
            link.remove();
          }}
        >
          <FileDownloadRoundedIcon />
        </IconButton>
        <IconButton shadowSize={2} onClick={handleClose}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <PhotoSwiper
        photos={photos}
        start={modalOpen}
        handleSlideChange={(idx) => setIdx(idx)}
      />
    </Modal>
  );
};
