import { ButtonHTMLAttributes, forwardRef } from "react";
import {
  focusedShapeStyles,
  hoverShapeStyles,
  normalShapeStyles,
} from "../atomics/styles/shape";
import { css } from "@emotion/react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shadowSize?: number;
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ shadowSize, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        css={(theme) => css`
          height: 36px;
          width: 36px;
          border-radius: 100%;
          color: ${theme.colors.onBackground};
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: none;
          ${normalShapeStyles({ theme, size: shadowSize })}
          &:hover {
            ${hoverShapeStyles({ theme, size: shadowSize })}
          }
          &:active {
            ${focusedShapeStyles({ theme, size: shadowSize })}
          }
        `}
      />
    );
  }
);
