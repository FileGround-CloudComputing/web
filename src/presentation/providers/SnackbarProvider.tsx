import { useSnackbarStore } from "@/data/snackbarStore";
import { css } from "@emotion/react";
import { ReactElement, useEffect, useState } from "react";

export const SnackBarProvider = (): ReactElement => {
  const { snackbar } = useSnackbarStore();
  const [open, isOpen] = useState(false);
  const timeout: number | null = null;
  useEffect(() => {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    setTimeout(() => {
      isOpen(false);
    }, 10000);
  }, [snackbar]);

  if (!open || snackbar == null) {
    return <></>;
  }
  return <div>{snackbar.message}</div>;
};
