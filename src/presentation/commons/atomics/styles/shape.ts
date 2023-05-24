import { Theme, css } from "@emotion/react";

interface ShapeStylesProps {
  theme: Theme;
  size?: number;
}

export const normalShapeStyles = ({ theme, size = 5 }: ShapeStylesProps) => css`
  background: ${theme.colors.background};
  box-shadow: ${size}px ${size}px ${size * 2}px ${theme.colors.darkShadow},
    -${size}px -${size}px ${size * 2}px ${theme.colors.lightShadow};
`;

export const hoverShapeStyles = ({ theme, size = 5 }: ShapeStylesProps) => css`
  background: linear-gradient(
    145deg,
    ${theme.colors.darkenBackground},
    ${theme.colors.lightenBackground}
  );
  box-shadow: ${size}px ${size}px ${size * 2}px ${theme.colors.darkShadow},
    -${size}px -${size}px ${size * 2}px ${theme.colors.lightShadow};
`;

export const activeShapeStyles = ({ theme, size = 5 }: ShapeStylesProps) => css`
  background: linear-gradient(
    145deg,
    ${theme.colors.lightenBackground},
    ${theme.colors.darkenBackground}
  );
  box-shadow: ${size}px ${size}px ${size * 2}px ${theme.colors.darkShadow},
    -${size}px -${size}px ${size * 2}px ${theme.colors.lightShadow};
`;

export const focusedShapeStyles = ({
  theme,
  size = 5,
}: ShapeStylesProps) => css`
  background: ${theme.colors.background};
  box-shadow: inset ${size}px ${size}px ${size * 2}px ${theme.colors.darkShadow},
    inset -${size}px -${size}px ${size * 2}px ${theme.colors.lightShadow};
`;
