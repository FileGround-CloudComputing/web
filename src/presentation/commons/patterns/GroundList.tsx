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

import { PopOver } from "../components/PopOver";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { GroundShare } from "./GroundShare";
import { DeleteGroundIconButton } from "./DeleteIconButton";
interface GroundListItemProps {
  ground: Ground;
}

const GroundListItemMenu = ({ ground }: GroundListItemProps): ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <Modal
          title={"그라운드 공유하기"}
          handleClose={() => {
            setOpen(false);
          }}
        >
          <GroundShare url={`${window.location.href}${ground.id}`} />
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
        <DeleteGroundIconButton ground={ground} shadowSize={2} />
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
        to={`${ground.id}`}
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
