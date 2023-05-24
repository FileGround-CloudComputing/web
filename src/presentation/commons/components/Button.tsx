import { ButtonHTMLAttributes, HTMLProps, forwardRef } from "react";
import {
  focusedShapeStyles,
  hoverShapeStyles,
  normalShapeStyles,
} from "../atomics/styles/shape";
import { SerializedStyles, Theme, css } from "@emotion/react";
import { typoStyles1, typoStyles2 } from "../atomics/typo";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading = false, ...props }, ref) => {
    if (loading)
      return (
        <button
          {...props}
          ref={ref}
          css={(theme) => css`
            ${buttonStyles(theme)}
            cursor: default;
          `}
          disabled
          children={
            <HourglassBottomRoundedIcon
              css={css`
                animation: spin 1s linear infinite;
                @keyframes spin {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}
            />
          }
        />
      );

    return (
      <button
        {...props}
        ref={ref}
        css={(theme) => css`
          ${buttonStyles(theme)}
          cursor: pointer;
        `}
      />
    );
  }
);

const buttonStyles = (theme: Theme): SerializedStyles => css`
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
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
