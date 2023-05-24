import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { CacheProvider, ThemeProvider, css } from "@emotion/react";
import { theme } from "@/presentation/commons/atomics/theme/theme";
import { GlobalStyles } from "./presentation/commons/atomics/theme/GlobalStyles";
import createCache from "@emotion/cache";
import { SnackBarProvider } from "./presentation/providers/SnackbarProvider";
const myCache = createCache({
  key: "css",
  prepend: true,
});

export const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={myCache}>
        <GlobalStyles />
        <div
          css={(theme) => css`
            width: 100%;
            height: 100%;
            background-color: ${theme.colors.background};
          `}
        >
          <RouterProvider router={router} />
        </div>
        <SnackBarProvider />
      </CacheProvider>
    </ThemeProvider>
  );
};
