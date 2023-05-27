import { css } from "@emotion/react";
import { HTMLProps, forwardRef } from "react";
import { focusedShapeStyles, normalShapeStyles } from "../atomics/styles/shape";
import { typoStyles3 } from "../atomics/typo";

interface CheckBoxProps extends HTMLProps<HTMLInputElement> {
  _?: any;
}
export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, ...props }, ref) => {
    return (
      <span
        css={css`
          display: flex;
          gap: 8px;
          align-items: center;
        `}
      >
        <label
          css={(theme) =>
            css`
              ${typoStyles3}
              color: ${theme.colors.secondary};
            `
          }
        >
          {label}
        </label>
        <input
          type="checkbox"
          {...props}
          ref={ref}
          css={(theme) => css`
            width: 24px;
            height: 24px;
            border-radius: 16px;
            border: none;
            margin: 0;
            cursor: pointer;
            appearance: none;
            border: 2px solid ${theme.colors.darkenBackground};
            ${normalShapeStyles({ theme })}
            background-color: transparent;
            &:checked {
              ${focusedShapeStyles({ theme })}
              border-color: ${theme.colors.onBackground};
            }
          `}
        />
      </span>
    );
  }
);
