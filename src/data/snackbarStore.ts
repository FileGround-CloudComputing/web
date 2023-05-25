import { Snackbar } from "@/domain/snackbar";
import { create } from "zustand";

interface SnackbarState {
  snackbar: Snackbar | null;
  timeout: number | null;
  addSnackbar: (snackbar: Snackbar) => void;
  setSnackbarTimeout: (timeout: number | null) => void;
}

export const useSnackbarStore = create<SnackbarState>()((set) => ({
  snackbar: null,
  timeout: null,
  addSnackbar: (snackbar: Snackbar) => {
    set({ snackbar });
  },
  setSnackbarTimeout: (timeout) => {
    set({ timeout });
  },
}));
