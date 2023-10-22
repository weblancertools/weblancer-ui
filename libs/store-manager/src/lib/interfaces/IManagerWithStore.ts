import { Reducer } from '@reduxjs/toolkit';
import { IManager } from '@weblancer-ui/types';
import { IStoreManagerActions } from '../types';

export abstract class IManagerWithStore extends IManager {
  public abstract sliceReducer: Reducer;

  public injectSlice(storeManager: IStoreManagerActions) {
    storeManager.injectSlice(this.name, this.sliceReducer);
  }
}
