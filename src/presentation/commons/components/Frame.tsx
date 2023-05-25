import { css } from "@emotion/react";
import { ReactElement, ReactNode } from "react";
import { focusedShapeStyles, normalShapeStyles } from "../atomics/styles/shape";

interface FrameProps {
  children: ReactElement;
}

export const ImageFrame = ({ children }: FrameProps): ReactElement => {
  return (
    <div
      css={(theme) => css`
        padding: 8px;
        border-radius: 100%;
        ${normalShapeStyles({ theme })}
        display:flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {children}
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
        ${focusedShapeStyles({ theme })}
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
