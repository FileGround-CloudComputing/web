import { css } from "@emotion/react";
import { ReactNode } from "react";
import {
  normalShapeStyles,
  hoverShapeStyles,
  focusedShapeStyles,
} from "../atomics/styles/shape";
import { typoStyles2 } from "../atomics/typo";

interface NumIndicatorProps {
  className?: string;
  shadowSize?: number;
  children?: ReactNode;
  isActive?: boolean;
}

export const NumIndicator = ({
  className,
  shadowSize = 4,
  children,
  isActive = false,
}: NumIndicatorProps) => {
  return (
    <div
      className={className}
      css={(theme) => css`
        ${isActive
          ? focusedShapeStyles({ theme, size: shadowSize })
          : normalShapeStyles({ theme, size: shadowSize })}
        ${typoStyles2}
        height: 50px;
        width: 100%;
        border-radius: 16px;
        color: ${theme.colors.onBackground};
        font-weight: 700;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      `}
    >
      {children}
    </div>
  );
};
