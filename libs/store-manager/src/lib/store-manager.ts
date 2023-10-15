import { IManager } from '@weblancer-ui/types';
import { Reducer, Store } from '@reduxjs/toolkit';
import { IStoreManagerActions, StoreManagerService } from './types';
import { inject, injectable } from 'inversify';
import {
  StoreService,
  weblancerRegistry,
} from '@weblancer-ui/manager-registry';

@injectable()
export class StoreManager extends IManager implements IStoreManagerActions {
  public name = StoreManagerService;

  constructor(@inject(StoreService) private store: Store) {
    super();

    this.makeStoreInjectable();
  }

  private makeStoreInjectable() {
    // TODO
  }

  public getState<TExpectedRootState>(): TExpectedRootState {
    return this.store.getState() as TExpectedRootState;
  }

  public dispatch = this.store.dispatch;

  public injectSlice<TSliceState>(slice: Reducer<TSliceState>): void {
    // throw new Error('injectStore Method not implemented.');
  }
}

weblancerRegistry.registerManager<IStoreManagerActions>(StoreManager);
