export type Direction = "ltr" | "rtl";

export interface DirectionState {
  direction: Direction;
}

export interface DirectionActions {
  setDirection: (direction: Direction) => void;
  initializeDirection: () => void;
}

export type DirectionStore = DirectionActions & DirectionState;
