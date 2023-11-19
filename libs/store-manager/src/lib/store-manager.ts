import { IManager } from '@weblancer-ui/types';
import { Reducer, Store, Unsubscribe } from '@reduxjs/toolkit';
import {
  IStoreManagerActions,
  InjectableStore,
  StoreManagerService,
} from './types';
import { inject, injectable } from 'inversify';
import { StoreService } from '@weblancer-ui/manager-registry';
import { freeze } from 'immer';
import { EqualityFn } from 'react-redux';
import { storeListener } from './helpers';

@injectable()
export class StoreManager extends IManager implements IStoreManagerActions {
  public name = StoreManagerService;

  constructor(@inject(StoreService) public store: Store & InjectableStore) {
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

  public listen<TState = unknown, Selected = unknown>(
    selector: (state: TState) => Selected,
    callback: (selected: Selected) => void,
    options?:
      | {
          equalityFn?: EqualityFn<Selected> | undefined;
          callImmediately?: boolean | undefined;
        }
      | undefined
  ): Unsubscribe {
    return storeListener(this.store, selector, callback, options);
  }
}
