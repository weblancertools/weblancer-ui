import { IStateManagerSlice } from '@weblancer-ui/manager-registry';
import { STATE_MANAGER_NAME } from './constants';

export interface IStoreRootState {
  [STATE_MANAGER_NAME]: IStateManagerSlice;
  [key: string]: unknown;
}
