import { css } from "@emotion/react";
import { ButtonHTMLAttributes, ReactElement, forwardRef } from "react";
import { titleStyles2, typoStyles2, typoStyles3 } from "../atomics/typo";
import {
  normalShapeStyles,
  hoverShapeStyles,
  focusedShapeStyles,
} from "../styles/shape";
import { IconFrame } from "./Frame";

interface ListProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  title: string;
  description: string;
  icon: ReactElement;
}
export const ListItemWithDesc = forwardRef<HTMLButtonElement, ListProps>(
  ({ title, description, icon, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        css={(theme) => css`
          padding: 16px;
          width: 100%;
          border-radius: 16px;
          color: ${theme.colors.onBackground};
          ${titleStyles2}
          cursor: pointer;
          border: none;
          ${normalShapeStyles(theme)}
          &:hover {
            ${hoverShapeStyles(theme)}
          }
          &:active {
            ${focusedShapeStyles(theme)}
          }
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
          gap: 16px;
        `}
      >
        <IconFrame>{icon}</IconFrame>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
          `}
        >
          <span>{title}</span>
          <span
            css={(theme) =>
              css`
                ${typoStyles3}
                color:${theme.colors.secondary};
              `
            }
          >
            {description}
          </span>
        </div>
      </button>
    );
  }
);
