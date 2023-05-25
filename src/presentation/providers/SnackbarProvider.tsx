import { useSnackbarStore } from "@/data/snackbarStore";
import { ReactElement, useEffect, useState } from "react";
import { BottomSnackbar } from "../commons/components/SnackBar";

export const SnackBarProvider = (): ReactElement => {
  const { snackbar } = useSnackbarStore();
  const [open, isOpen] = useState(false);

  const handleClose = () => {
    isOpen(false);
  };
  useEffect(() => {
    isOpen(true);
    setTimeout(() => {
      handleClose();
    }, 10000);
  }, [snackbar]);
  if (!open || snackbar == null) {
    return <></>;
  }
  return <BottomSnackbar snackbar={snackbar} handleClose={handleClose} />;
};
