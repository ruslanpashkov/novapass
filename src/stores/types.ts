export interface HydrationActions {
  setHasHydrated: (state: boolean) => void;
}

export type HydrationStore = HydrationActions & HydrationState;

export interface HydrationState {
  _hasHydrated: boolean;
}

export type WithHydration<T> = HydrationStore & T;
