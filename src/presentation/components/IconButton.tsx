import { ButtonHTMLAttributes, HTMLProps, forwardRef } from "react";
import {
  focusedShapeStyles,
  hoverShapeStyles,
  normalShapeStyles,
} from "../styles/shape";
import { css } from "@emotion/react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ ...props }, ref) => {
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
          cursor: pointer;
          border: none;
          ${normalShapeStyles(theme)}
          &:hover {
            ${hoverShapeStyles(theme)}
          }
          &:active {
            ${focusedShapeStyles(theme)}
          }
        `}
      />
    );
  }
);
