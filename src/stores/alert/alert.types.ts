export interface AlertActions {
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

export interface AlertState {
  message: string | null;
  open: boolean;
}

export type AlertStore = AlertActions & AlertState;
