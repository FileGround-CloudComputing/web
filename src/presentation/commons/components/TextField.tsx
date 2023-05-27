import { Theme, css } from "@emotion/react";
import { HTMLProps, forwardRef } from "react";
import { focusedShapeStyles, normalShapeStyles } from "../atomics/styles/shape";

export interface TextFieldProps extends HTMLProps<HTMLInputElement> {
  shadowSize?: number;
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ shadowSize = 5, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      css={(theme: Theme) => css`
        border: none;
        padding: 1rem;
        border-radius: 1rem;
        ${normalShapeStyles({ theme, size: shadowSize })}
        &:focus {
          ${focusedShapeStyles({ theme, size: shadowSize })}
          outline: none;
        }
      `}
    />
  )
);

TextField.displayName = "TextField";
