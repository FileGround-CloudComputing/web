import { useGroundRepository } from "@/data/groundRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
import { IconButton } from "../components/IconButton";
import { Ground } from "@/domain/ground";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Photo } from "@/domain/photo";
export const DeleteGroundIconButton = ({
  ground,
  shadowSize,
}: {
  ground: Ground;
  shadowSize?: number;
}) => {
  const { deleteGround } = useGroundRepository();
  const { addSnackbar } = useSnackbarStore();
  return (
    <IconButton
      onClick={() => {
        if (confirm("정말로 삭제하시겠습니까?")) {
          deleteGround(ground.id.toString())
            .then(() => {
              addSnackbar({
                message: "성공적으로 삭제했습니다.",
                type: "success",
              });
            })
            .catch(() => {
              addSnackbar({
                message: "erorr",
                type: "error",
              });
            });
        }
      }}
      shadowSize={shadowSize}
    >
      <DeleteRoundedIcon />
    </IconButton>
  );
};

export const DeletePhotoButton = ({
  photo,
  onDelete,
  shadowSize,
}: {
  photo: Photo;
  shadowSize?: number;
  onDelete?: () => void;
}) => {
  const { deletePhoto } = useGroundRepository();
  const { addSnackbar } = useSnackbarStore();
  return (
    <IconButton
      onClick={() => {
        if (confirm("정말로 삭제하시겠습니까?")) {
          deletePhoto(photo)
            .then(() => {
              addSnackbar({
                message: "성공적으로 삭제했습니다.",
                type: "success",
              });
              onDelete?.();
            })
            .catch((e) => {
              console.log(e);
              addSnackbar({
                message: "erorr",
                type: "error",
              });
            });
        }
      }}
      shadowSize={shadowSize}
    >
      <DeleteRoundedIcon />
    </IconButton>
  );
};
