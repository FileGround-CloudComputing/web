import { ReactElement } from "react";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { IconButton } from "@/presentation/commons/components/IconButton";
import { Photo } from "@/domain/photo";
interface PhotoListMenuProps {
  photos: Photo[];
}
export const PhotoListMenu = ({ photos }: PhotoListMenuProps): ReactElement => {
  return (
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
  );
};
