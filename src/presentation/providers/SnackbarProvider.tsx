import { useSnackbarStore } from "@/data/snackbarStore";
import { ReactElement, useEffect, useState } from "react";
import { BottomSnackbar } from "../commons/components/SnackBar";

export const SnackBarProvider = (): ReactElement => {
  const { snackbar, timeout, setSnackbarTimeout } = useSnackbarStore();
  const [open, isOpen] = useState(false);

  const handleClose = () => {
    isOpen(false);
  };
  useEffect(() => {
    if (timeout != null) {
      clearTimeout(timeout);
      setSnackbarTimeout(null);
    }
    isOpen(true);
    setSnackbarTimeout(
      setTimeout(() => {
        handleClose();
      }, 10000)
    );
  }, [snackbar, setSnackbarTimeout]);
  if (!open || snackbar == null) {
    return <></>;
  }
  return <BottomSnackbar snackbar={snackbar} handleClose={handleClose} />;
};
