import { css } from "@emotion/react";
import { ReactElement, ReactNode, cloneElement } from "react";
import { normalShapeStyles } from "../styles/shape";

interface FrameProps {
  src: string;
}

export const ImageFrame = ({ src }: FrameProps): ReactElement => {
  return (
    <div
      css={(theme) => css`
        height: 200px;
        width: 200px;
        border-radius: 100%;
        ${normalShapeStyles(theme)}
        display:flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <img
        src={src}
        css={css`
          width: 185px;
          height: 185px;
          border-radius: 100%;
        `}
      />
    </div>
  );
};
