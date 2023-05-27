import { ReactElement } from "react";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { IconButton } from "@/presentation/commons/components/IconButton";
import { Photo } from "@/domain/photo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { css } from "@emotion/react";
import { transitionStyles } from "@/presentation/commons/atomics/styles/transition";
interface PhotoListMenuProps {
  photos: Photo[];
  isOpen: boolean;
  toggleIsOpen: () => void;
}
export const PhotoListMenu = ({
  photos,
  isOpen,
  toggleIsOpen,
}: PhotoListMenuProps): ReactElement => {
  return (
    <>
      <IconButton
        shadowSize={2}
        onClick={() => {
          if (confirm("정말로 다운로드 하시겠습니까?")) {
            photos.forEach((photo, i) => {
              setTimeout(() => {
                if (photo.blob == null) return;
                const link = document.createElement("a");
                link.href = URL.createObjectURL(photo.blob);
                link.download = photo.src;
                link.click();
                link.remove();
              }),
                i * 100;
            });
          }
        }}
      >
        <FileDownloadRoundedIcon />
      </IconButton>
      <IconButton shadowSize={2} onClick={toggleIsOpen}>
        <KeyboardArrowDownIcon
          css={css`
            ${transitionStyles}
            transition-property: transform;
            transform: ${isOpen ? "rotate(180deg)" : "rotate(0deg)"};
          `}
        />
      </IconButton>
    </>
  );
};
