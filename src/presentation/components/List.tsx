import { css } from "@emotion/react";
import { HTMLAttributes, ReactNode } from "react";
import { transitionStyles } from "../styles/transition";
import {
  normalShapeStyles,
  hoverShapeStyles,
  focusedShapeStyles,
} from "../styles/shape";
import { typoStyles2 } from "../atomics/typo";

interface ListProps {
  children: ReactNode;
}
export const List = ({ children }: ListProps) => {
  return (
    <div
      css={(theme) => css`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        border-radius: 16px;
        padding: 16px;
        ${focusedShapeStyles({ theme, size: 3 })}
      `}
    >
      {children}
    </div>
  );
};

type ListItemProps = HTMLAttributes<HTMLButtonElement>;
export const ListItem = ({ ...props }: ListItemProps) => {
  return (
    <button
      {...props}
      css={(theme) => css`
        border-radius: 16px;
        padding: 16px;
        border: none;
        cursor: pointer;
        cursor: pointer;
        border: none;
        ${typoStyles2}
        ${normalShapeStyles({ theme, size: 2 })}
        &:hover {
          ${hoverShapeStyles({ theme, size: 2 })}
        }
        &:active {
          ${focusedShapeStyles({ theme, size: 2 })}
        }
      `}
    />
  );
};
