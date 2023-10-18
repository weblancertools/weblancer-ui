import { PropManagerService } from './constants';

export interface IStoreRootState {
  [PropManagerService]: IPropManagerSlice;
  [key: string]: unknown;
}

export interface IPropManagerSlice {
  test?: string;
}

export interface IPropManagerActions {
  test?: string;
}
