import { AnyAction, Dispatch, Reducer, Store } from '@reduxjs/toolkit';

export const StoreManagerService = 'StoreManager';

export interface IStoreManagerActions {
  store: Store;
  getState<TExpectedRootState>(): Readonly<TExpectedRootState>;
  dispatch: Dispatch<AnyAction>;
  injectSlice<TSliceState>(key: string, slice: Reducer<TSliceState>): void;
}

export type InjectableStore = {
  injectReducer: (key: string, reducer: Reducer) => void;
  asyncReducers: Record<string, Reducer>;
};
