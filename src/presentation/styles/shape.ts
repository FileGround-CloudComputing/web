import { Theme, css } from "@emotion/react";

export const normalShapeStyles = (theme: Theme) => css`
  background: ${theme.colors.background};
  box-shadow: 5px 5px 10px ${theme.colors.darkShadow},
    -5px -5px 10px ${theme.colors.lightShadow};
`;

export const hoverShapeStyles = (theme: Theme) => css`
  background: linear-gradient(
    145deg,
    ${theme.colors.darkenBackground},
    ${theme.colors.lightenBackground}
  );
  box-shadow: 5px 5px 10px ${theme.colors.darkShadow},
    -5px -5px 10px ${theme.colors.lightShadow};
`;

export const activeShapeStyles = (theme: Theme) => css`
  background: linear-gradient(
    145deg,
    ${theme.colors.lightenBackground},
    ${theme.colors.darkenBackground}
  );
  box-shadow: 5px 5px 10px ${theme.colors.darkShadow},
    -5px -5px 10px ${theme.colors.lightShadow};
`;

export const focusedShapeStyles = (theme: Theme) => css`
  background: ${theme.colors.background};
  box-shadow: inset 5px 5px 10px ${theme.colors.darkShadow},
    inset -5px -5px 10px ${theme.colors.lightShadow};
`;
