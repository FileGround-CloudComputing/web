import { Snackbar } from "@/domain/snackbar";
import { css } from "@emotion/react";
import { ReactElement } from "react";
interface SnackBarProps {
  snackbar: Snackbar;
}
export const BottomSnackbar = ({ snackbar }: SnackBarProps): ReactElement => {
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
      `}
    >
      <div
        css={css`
          position: absolute;
          height: 50px;
          width: 16px;
          left: 0px;
          border-radius: 16px 0px 0px 16px;
          background-color: red;
        `}
      />
      <div
        css={(theme) => css`
          padding: 16px 16px 16px 32px;
          border-radius: 16px;
          flex: 1;
          color: ${theme.colors.background};
          background-color: ${theme.colors.onBackground};
        `}
      >
        {snackbar.message}
      </div>
    </div>
  );
};
