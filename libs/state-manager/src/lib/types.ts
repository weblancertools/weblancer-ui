import { IReduxSelector, ITypeInfo } from '@weblancer-ui/types';
import { StateManagerService } from './constants';

export interface IStoreRootState {
  [StateManagerService]: IStateManagerSlice;
  [key: string]: unknown;
}

export interface IStateManagerSlice {
  [key: string]: {
    key: string;
    value?: unknown;
    typeInfo: ITypeInfo;
  };
}

export interface IStateManagerActions {
  setState(key: string, value?: unknown): void;
  createOrUpdateState(
    key: string,
    typeInfo: ITypeInfo,
    defaultValue?: unknown
  ): void;
  removeState(key: string): void;
  getStateSelector(key: string): ReturnType<IReduxSelector>;
  getAllStates(): IStateManagerSlice;
}
