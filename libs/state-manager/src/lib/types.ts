import { ITypeInfo } from '@weblancer-ui/types';
import { STATE_MANAGER_NAME } from './constants';
import { IStateManagerSlice } from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

export interface IStoreRootState {
  [STATE_MANAGER_NAME]: IStateManagerSlice;
  [key: string]: unknown;
}

export type IReduxSelector = typeof createDraftSafeSelector;

export interface IStateManagerActions {
  setState(key: string, value?: unknown): void;
  createState(key: string, typeInfo: ITypeInfo, defaultValue?: unknown): void;
  getStateSelector(key: string): ReturnType<IReduxSelector>;
  getAllStates(): IStateManagerSlice;
}
