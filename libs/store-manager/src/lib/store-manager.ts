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
import { freeze } from 'immer';

@injectable()
export class StoreManager extends IManager implements IStoreManagerActions {
  public name = StoreManagerService;

  constructor(@inject(StoreService) private store: Store & InjectableStore) {
    super();
  }

  public getState<TExpectedRootState>(): Readonly<TExpectedRootState> {
    return freeze(this.store.getState(), true) as Readonly<TExpectedRootState>;
  }

  public dispatch = this.store.dispatch;

  public injectSlice<TSliceState>(
    key: string,
    sliceReducer: Reducer<TSliceState>
  ): void {
    this.store.injectReducer(key, sliceReducer);
  }
}

weblancerRegistry.registerManager<IStoreManagerActions>(StoreManager);
