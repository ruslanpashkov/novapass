export interface DirectionActions {
  setDirection: (direction: Direction) => void;
  initializeDirection: () => void;
}

export type DirectionStore = DirectionActions & DirectionState;

export interface DirectionState {
  direction: Direction;
}

export type Direction = "ltr" | "rtl";
