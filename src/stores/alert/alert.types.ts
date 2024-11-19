export interface AlertState {
  message: string | null;
  open: boolean;
}

export interface AlertActions {
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

export type AlertStore = AlertActions & AlertState;
