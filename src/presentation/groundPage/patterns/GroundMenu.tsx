import { ReactElement, useState } from "react";
import { css } from "@emotion/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { PopOver } from "@/presentation/commons/components/PopOver";
import { IconButton } from "@/presentation/commons/components/IconButton";
import { Ground } from "@/domain/ground";
import { GroundShare } from "@/presentation/commons/patterns/GroundShare";
import { Modal } from "@/presentation/commons/patterns/Modal";
import { useUserStore } from "@/data/userRepository";
import { useGroundRepository } from "@/data/groundRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "@/domain/paths";
interface GroundMenuProps {
  ground: Ground;
}
export const GroundMenu = ({ ground }: GroundMenuProps): ReactElement => {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  const { deleteGround } = useGroundRepository();
  const { addSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  return (
    <>
      {open && (
        <Modal
          title="공유하기"
          handleClose={() => {
            setOpen(false);
          }}
        >
          <GroundShare url={`${window.location.href}${ground.key}`} />
        </Modal>
      )}
      <PopOver>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: 8px;
          `}
        >
          {ground.uid == user?.uid && (
            <IconButton
              shadowSize={2}
              onClick={() => {
                if (confirm("정말로 삭제하시겠습니까?")) {
                  deleteGround(ground.key.toString())
                    .then(() => {
                      addSnackbar({
                        message: "성공적으로 삭제했습니다.",
                        type: "success",
                      });
                      navigate(MAIN_PATH);
                    })
                    .catch(() => {
                      addSnackbar({
                        message: "erorr",
                        type: "error",
                      });
                    });
                }
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          )}
          <IconButton shadowSize={2}>
            <ShareRoundedIcon
              onClick={() => {
                setOpen(true);
              }}
            />
          </IconButton>
        </div>
      </PopOver>
    </>
  );
};
