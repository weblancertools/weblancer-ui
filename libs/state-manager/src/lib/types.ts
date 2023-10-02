import { STATE_MANAGER_NAME } from './constants';
import { IStateSlice } from './slice/stateSlice';

export interface IStoreRootState {
  [STATE_MANAGER_NAME]: IStateSlice;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
