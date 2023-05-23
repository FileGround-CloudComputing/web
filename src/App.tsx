import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ThemeProvider, css } from "@emotion/react";
import { theme } from "@/presentation/atomics/theme/theme";
import { GlobalStyles } from "./presentation/atomics/theme/GlobalStyles";
export const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div
        css={(theme) => css`
          min-width: 100vw;
          min-height: 100vh;
          background-color: ${theme.colors.background};
        `}
      >
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};
