export interface HistoryUIState {
  open: boolean;
}

export interface HistoryUIActions {
  showHistory: () => void;
  hideHistory: () => void;
}

export type HistoryUIStore = HistoryUIActions & HistoryUIState;
