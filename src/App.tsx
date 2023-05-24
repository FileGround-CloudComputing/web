import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { CacheProvider, ThemeProvider, css } from "@emotion/react";
import { theme } from "@/presentation/commons/atomics/theme/theme";
import { GlobalStyles } from "./presentation/commons/atomics/theme/GlobalStyles";
import createCache from "@emotion/cache";
import { SnackBarProvider } from "./presentation/providers/SnackbarProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const myCache = createCache({
  key: "css",
  prepend: true,
});
const queryClient = new QueryClient();
export const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={myCache}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <div
            css={(theme) => css`
              width: 100%;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              background-color: ${theme.colors.background};
            `}
          >
            <RouterProvider router={router} />
          </div>
          <SnackBarProvider />
        </QueryClientProvider>
      </CacheProvider>
    </ThemeProvider>
  );
};
