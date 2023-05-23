import { ReactElement } from "react";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { css } from "@emotion/react";
import { ImageFrame } from "../components/Frame";
import { pageStyles } from "../styles/shape";
import { logoStyles, typoStyles } from "../atomics/typo";
import { FlowContainer } from "../components/Flow";
export const MainPage = (): ReactElement => {
  return (
    <div css={pageStyles}>
      <FlowContainer>
        <h2
          css={(theme) => css`
            ${logoStyles}
            font-size: 64px;
            text-align: center;
            color: ${theme.colors.onBackground};
            padding: 0 16px;
          `}
        >
          FRONTEND DEVELOPER
        </h2>
      </FlowContainer>
      <ImageFrame
        src={
          "https://images.unsplash.com/photo-1634129366530-61d3e56a84fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
        }
      />
      <h3
        css={(theme) => css`
          ${typoStyles}
          font-weight: 900;
          font-size: 2rem;
          color: ${theme.colors.onBackground};
        `}
      >
        심규진
      </h3>
      <IconButton>
        <AccessTimeFilledIcon
          css={(theme) =>
            css`
              fill: ${theme.colors.onBackground};
            `
          }
        />
      </IconButton>
      <Button>test</Button>
    </div>
  );
};
