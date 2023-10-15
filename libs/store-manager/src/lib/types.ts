import { AnyAction, Dispatch, Reducer } from '@reduxjs/toolkit';

export const StoreManagerService = 'StoreManager';

export interface IStoreManagerActions {
  getState<TExpectedRootState>(): TExpectedRootState;
  dispatch: Dispatch<AnyAction>;
  injectSlice<TSliceState>(slice: Reducer<TSliceState>): void;
}

export type InjectableStore = {
  injectReducer: (key: string, reducer: Reducer) => void;
  asyncReducers: Record<string, Reducer>;
};
