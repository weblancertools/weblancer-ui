import { IStateManagerSlice } from '@weblancer-ui/types';
import { STATE_MANAGER_NAME } from './constants';

export interface IStoreRootState {
  [STATE_MANAGER_NAME]: IStateManagerSlice;
  [key: string]: unknown;
}
