import { IManager } from '@weblancer-ui/types';
import { Reducer, Store } from '@reduxjs/toolkit';
import {
  IStoreManagerActions,
  InjectableStore,
  StoreManagerService,
} from './types';
import { inject, injectable } from 'inversify';
import {
  StoreService,
  weblancerRegistry,
} from '@weblancer-ui/manager-registry';

@injectable()
export class StoreManager extends IManager implements IStoreManagerActions {
  public name = StoreManagerService;

  constructor(@inject(StoreService) private store: Store & InjectableStore) {
    super();
  }

  public getState<TExpectedRootState>(): TExpectedRootState {
    return this.store.getState() as TExpectedRootState;
  }

  public dispatch = this.store.dispatch;

  public injectSlice<TSliceState>(sliceReducer: Reducer<TSliceState>): void {
    this.store.injectReducer(sliceReducer.name, sliceReducer);
  }
}

weblancerRegistry.registerManager<IStoreManagerActions>(StoreManager);
