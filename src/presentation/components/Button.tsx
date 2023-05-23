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
          ${normalShapeStyles({ theme })}
          &:hover {
            ${hoverShapeStyles({ theme })}
          }
          &:active {
            ${focusedShapeStyles({ theme })}
          }
          ${typoStyles2}
          height: 50px;
          width: 100%;
          border-radius: 16px;
          color: ${theme.colors.onBackground};
          font-weight: 700;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        `}
      />
    );
  }
);
