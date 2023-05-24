import { Snackbar } from "@/domain/snackbar";
import { css } from "@emotion/react";
import { ReactElement } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "./IconButton";
import { theme } from "../atomics/theme/theme";
interface SnackBarProps {
  snackbar: Snackbar;
  handleClose: () => void;
}
export const BottomSnackbar = ({
  snackbar,
  handleClose,
}: SnackBarProps): ReactElement => {
  return (
    <div
      css={css`
        position: absolute;
        bottom: 50px;
        left: calc(50% - 150px);
        width: 300px;
        height: 50px;
        display: flex;
        flex-direction: row;
        border-radius: 16px;
        z-index: 50;
        flex: 1;
        color: ${theme.colors.background};
        background-color: ${theme.colors.onBackground};
      `}
    >
      <div
        css={(theme) => css`
          position: absolute;
          height: 50px;
          width: 16px;
          left: 0px;
          border-radius: 16px 0px 0px 16px;
          background-color: ${theme.colors[snackbar.type]};
        `}
      />
      <div
        css={(theme) => css`
          flex: 1;
          padding: 16px 16px 16px 32px;
          color: ${theme.colors.background};
        `}
      >
        {snackbar.message}
      </div>
      <button
        css={css`
          background-color: transparent;
          cursor: pointer;
          outline: none;
          border: none;
          fill: ${theme.colors.background};
          color: ${theme.colors.background};
          stroke: ${theme.colors.background};
          &:hover {
            fill: ${theme.colors.darkenBackground};
            color: ${theme.colors.darkenBackground};
            stroke: ${theme.colors.darkenBackground};
          }
        `}
        onClick={(e) => {
          handleClose();
          e.stopPropagation();
        }}
      >
        <CloseRoundedIcon />
      </button>
    </div>
  );
};
