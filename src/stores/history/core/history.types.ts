export interface HistoryActions {
  addPassword: (password: string) => void;
  removePassword: (id: number) => void;
  clearHistory: () => void;
}

export interface Password {
  createdAt: string;
  value: string;
  id: number;
}

export interface HistoryState {
  passwords: Password[];
}

export type HistoryStore = HistoryActions & HistoryState;
