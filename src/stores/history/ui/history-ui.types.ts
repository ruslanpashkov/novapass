export interface HistoryUIActions {
  showHistory: () => void;
  hideHistory: () => void;
}

export type HistoryUIStore = HistoryUIActions & HistoryUIState;

export interface HistoryUIState {
  open: boolean;
}
