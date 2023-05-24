import { Ground } from "@/domain/ground";
import { css } from "@emotion/react";
import { titleStyles3, typoStyles3 } from "../atomics/typo";
import { IconButton } from "../components/IconButton";
import {
  normalShapeStyles,
  hoverShapeStyles,
  focusedShapeStyles,
} from "../styles/shape";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { PopOver } from "../components/PopOver";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useGroundRepository } from "@/data/groundRepository";
interface GroundListItemProps {
  ground: Ground;
}

const GroundListItemMenu = ({ ground }: GroundListItemProps): ReactElement => {
  const { deleteGround } = useGroundRepository();
  return (
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
          console.log(`${window.location.host}/${ground.key}}`);
        }}
      >
        <ShareRoundedIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          if (confirm("정말로 삭제하시겠습니까?")) {
            deleteGround(ground.key);
          }
        }}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </div>
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
