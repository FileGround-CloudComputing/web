import { ButtonHTMLAttributes, HTMLProps, forwardRef } from "react";
import {
  focusedShapeStyles,
  hoverShapeStyles,
  normalShapeStyles,
} from "../styles/shape";
import { css } from "@emotion/react";
import { typoStyles1, typoStyles2 } from "../atomics/typo";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        css={(theme) => css`
          height: 50px;
          width: 100%;
          border-radius: 16px;
          color: ${theme.colors.onBackground};
          ${typoStyles2}
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
