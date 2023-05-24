import { Snackbar } from "@/domain/snackbar";
import { create } from "zustand";

interface SnackbarState {
  snackbar: Snackbar | null;
  addSnackbar: (snackbar: Snackbar) => void;
}

export const useSnackbarStore = create<SnackbarState>()((set, get) => ({
  snackbar: null,
  addSnackbar: (snackbar: Snackbar) => {
    set({ snackbar });
  },
}));
