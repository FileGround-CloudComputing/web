import { ReactElement, useState } from "react";
import { css } from "@emotion/react";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { PopOver } from "@/presentation/commons/components/PopOver";
import { IconButton } from "@/presentation/commons/components/IconButton";
import { Ground } from "@/domain/ground";
import { GroundShare } from "@/presentation/commons/patterns/GroundShare";
import { Modal } from "@/presentation/commons/patterns/Modal";
import { useUserStore } from "@/data/userRepository";
import { DeleteGroundIconButton } from "@/presentation/commons/patterns/DeleteIconButton";
interface GroundMenuProps {
  ground: Ground;
}
export const GroundMenu = ({ ground }: GroundMenuProps): ReactElement => {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  return (
    <>
      {open && (
        <Modal
          title="공유하기"
          handleClose={() => {
            setOpen(false);
          }}
        >
          <GroundShare url={`${window.location.href}${ground.id}`} />
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
            <DeleteGroundIconButton ground={ground} />
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
