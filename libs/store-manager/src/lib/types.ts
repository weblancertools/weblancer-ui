import {
  AnyAction,
  Dispatch,
  Reducer,
  Store,
  Unsubscribe,
} from '@reduxjs/toolkit';
import { EqualityFn } from 'react-redux';

export const StoreManagerService = 'StoreManager';

export interface IStoreManagerActions {
  store: Store;
  getState<TExpectedRootState>(): Readonly<TExpectedRootState>;
  dispatch: Dispatch<AnyAction>;
  injectSlice<TSliceState>(key: string, slice: Reducer<TSliceState>): void;
  listen<TState = unknown, Selected = unknown>(
    selector: (state: TState) => Selected,
    callback: (selected: Selected) => void,
    options?: {
      equalityFn?: EqualityFn<Selected> | undefined;
      callImmediately?: boolean;
    }
  ): Unsubscribe;
}

export type InjectableStore = {
  injectReducer: (key: string, reducer: Reducer) => void;
  asyncReducers: Record<string, Reducer>;
};
