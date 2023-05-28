import { IconButton } from "@/presentation/commons/components/IconButton";
import { Modal } from "@/presentation/commons/patterns/Modal";
import { css } from "@emotion/react";
import { ReactElement } from "react";
import { PhotoSwiper } from "./PhotoSwiper";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Photo } from "@/domain/photo";
import { DeletePhotoButton } from "@/presentation/commons/patterns/DeleteIconButton";
import { LikeIconButton } from "@/presentation/commons/patterns/LikeIconButton";
import { Ground } from "@/domain/ground";
import { titleStyles3 } from "@/presentation/commons/atomics/typo";
import { useGroundRepository } from "@/data/groundRepository";
import { useUserStore } from "@/data/userRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
interface PhotoListModalProps {
  photos: Photo[];
  modalOpen: number;
  setIdx: (idx: number) => void;
  handleClose: () => void;
  idx: number;
  ground: Ground;
}
export const PhotoListModal = ({
  photos,
  modalOpen,
  idx,
  setIdx,
  handleClose,
  ground,
}: PhotoListModalProps): ReactElement => {
  const { likePhoto, unlikePhoto } = useGroundRepository();
  const { user } = useUserStore();
  const { addSnackbar } = useSnackbarStore();
  return (
    <Modal
      handleClose={handleClose}
      css={css`
        width: 90%;
        max-width: 50vh;
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
        <DeletePhotoButton photo={photos[idx]} onDelete={handleClose} />
        <div
          css={css`
            flex: 1;
          `}
        />
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
      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        />
        {user != null && (
          <LikeIconButton
            liked={photos[idx].likes.get(user.uid) != null}
            likedOnClick={() => {
              likePhoto(ground, photos[idx])
                .then(() => {
                  addSnackbar({ message: "좋아요!", type: "success" });
                })
                .catch(() => {
                  addSnackbar({ message: "좋아요 실패!", type: "error" });
                });
            }}
            unlikedOnClick={() => {
              unlikePhoto(ground, photos[idx])
                .then(() => {
                  addSnackbar({ message: "좋아요 취소!", type: "success" });
                })
                .catch(() => {
                  addSnackbar({
                    message: "좋아요 취소 실패!",
                    type: "error",
                  });
                });
            }}
          />
        )}
        <span
          css={(theme) => css`
            ${titleStyles3}
            color: ${theme.colors.onBackground};
          `}
        >
          {photos[idx].likes.size}개
        </span>
      </div>
    </Modal>
  );
};
