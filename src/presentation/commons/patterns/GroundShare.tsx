import { css, useTheme } from "@emotion/react";
import { ReactElement } from "react";
import QRCode from "react-qr-code";
import { normalShapeStyles } from "../atomics/styles/shape";
import { IconButton } from "../components/IconButton";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { typoStyles3 } from "../atomics/typo";
import { useSnackbarStore } from "@/data/snackbarStore";
interface GroundQRProps {
  url: string;
}
// TODO share로 바꾸기
export const GroundShare = ({ url }: GroundQRProps): ReactElement => {
  const { addSnackbar } = useSnackbarStore();
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;
        width: 100%;
      `}
    >
      <QRCode
        value={url}
        bgColor={theme.colors.background}
        color={theme.colors.onBackground}
        size={200}
        css={(theme) =>
          css`
            background-color: ${theme.colors.background};
            fill: ${theme.colors.onBackground} !important;
            padding: 16px;
            border-radius: 16px;

            ${normalShapeStyles({ theme, size: 10 })}
          `
        }
      />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        `}
      >
        <span
          css={(theme) => css`
            ${typoStyles3}
            color: ${theme.colors.secondary};
            padding-right: 8px;
            margin-right: 8px;
            border-right: 2px solid ${theme.colors.darkenBackground};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            width: 100%;
          `}
        >
          {url}
        </span>

        <IconButton
          onClick={() => {
            window.navigator.clipboard.writeText(url);
            addSnackbar({
              message: "클립보드에 복사되었습니다.",
              type: "success",
            });
          }}
        >
          <ContentCopyRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};
