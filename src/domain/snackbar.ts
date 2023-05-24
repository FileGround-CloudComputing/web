export type SnackbarType = "success" | "error" | "warning" | "info";
export interface Snackbar {
  message: string;
  type: SnackbarType;
}
