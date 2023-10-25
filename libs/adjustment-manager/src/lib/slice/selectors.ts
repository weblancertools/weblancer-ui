import { AdjustmentManagerService, IStoreRootState } from '../types';

export const adjustmentsSelector = (store: IStoreRootState) =>
  store[AdjustmentManagerService].adjustments;
