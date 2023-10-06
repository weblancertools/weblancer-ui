import { ITypeInfo } from '@weblancer-ui/types';
import { STATE_MANAGER_NAME } from './constants';
import { IStateSlice } from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

export interface IStoreRootState {
  [STATE_MANAGER_NAME]: IStateSlice;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IStateManagerActions {
  setState(key: string, value?: unknown): void;
  createState(key: string, typeInfo: ITypeInfo, defaultValue?: unknown): void;
  getStateSelector(key: string): ReturnType<typeof createDraftSafeSelector>;
}
