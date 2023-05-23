import { css } from "@emotion/react";
import { ReactElement, ReactNode, cloneElement } from "react";
import { focusedShapeStyles, normalShapeStyles } from "../styles/shape";

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

export const IconFrame = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <span
      css={(theme) => css`
        ${focusedShapeStyles(theme)}
        border-radius:100%;
        aspect-ratio: 1;
        line-height: 0;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {children}
    </span>
  );
};
