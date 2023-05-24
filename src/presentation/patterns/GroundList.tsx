import { Ground } from "@/domain/ground";
import { css } from "@emotion/react";
import { titleStyles3, typoStyles3 } from "../atomics/typo";
import { IconButton } from "../components/IconButton";
import {
  normalShapeStyles,
  hoverShapeStyles,
  focusedShapeStyles,
} from "../atomics/styles/shape";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { PopOver } from "../components/PopOver";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { useGroundRepository } from "@/data/groundRepository";
import { Modal } from "./Modal";
import { GroundShare } from "./GroundShare";
import { useSnackbarStore } from "@/data/snackbarStore";
interface GroundListItemProps {
  ground: Ground;
}

const GroundListItemMenu = ({ ground }: GroundListItemProps): ReactElement => {
  const { deleteGround } = useGroundRepository();
  const [open, setOpen] = useState(false);
  const { addSnackbar } = useSnackbarStore();
  return (
    <>
      {open && (
        <Modal
          title={"그라운드 공유하기"}
          handleClose={() => {
            setOpen(false);
          }}
        >
          <GroundShare url={`${window.location.href}${ground.key}`} />
        </Modal>
      )}
      <div
        css={(theme) => css`
          display: flex;
          flex-direction: row;
          justify-content: end;
          gap: 4px;
          background-color: ${theme.colors.darkenBackground};
          border-radius: 16px;
          padding: 6px;
        `}
      >
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <ShareRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (confirm("정말로 삭제하시겠습니까?")) {
              deleteGround(ground.key)
                .then(() => {
                  addSnackbar({
                    message: "성공적으로 삭제했습니다.",
                    type: "success",
                  });
                })
                .catch((e) => {
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
      </div>
    </>
  );
};
export const GroundListItem = ({ ground }: GroundListItemProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 8px;
      `}
    >
      <Link
        to={`${ground.key}`}
        css={css`
          flex: 1;
        `}
      >
        <button
          css={(theme) => css`
            border-radius: 16px;
            padding: 8px 16px;
            width: 100%;
            border: none;
            cursor: pointer;
            cursor: pointer;
            border: none;
            ${normalShapeStyles({ theme, size: 3 })}
            &:hover {
              ${hoverShapeStyles({ theme, size: 3 })}
            }
            &:active {
              ${focusedShapeStyles({ theme, size: 3 })}
            }
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
            `}
          >
            <span
              css={(theme) => css`
                ${titleStyles3}
                color:${theme.colors.onBackground};
              `}
            >
              {ground.title}
            </span>
            <span
              css={(theme) => css`
                ${typoStyles3}
                color:${theme.colors.secondary};
              `}
            >
              {new Date(ground.createdAt).toLocaleString("ko-kr", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
          </div>
        </button>
      </Link>
      <PopOver>
        <GroundListItemMenu ground={ground} />
      </PopOver>
    </div>
  );
};
