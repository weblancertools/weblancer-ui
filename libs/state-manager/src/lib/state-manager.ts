import { ITypeInfo, IReduxSelector } from '@weblancer-ui/types';
import stateSlice, {
  createOrUpdateState,
  removeState,
  setState,
} from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import {
  IStateManagerActions,
  IStateManagerSlice,
  IStoreRootState,
} from './types';
import { inject, injectable } from 'inversify';
import { Weblancer } from '@weblancer-ui/manager-registry';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { StateManagerService } from './constants';
import { importManager } from '@weblancer-ui/utils';

@injectable()
@importManager([StoreManager])
export class StateManager
  extends IManagerWithStore
  implements IStateManagerActions
{
  public sliceReducer = stateSlice;
  public name = StateManagerService;
  private selectorCache: Record<string, ReturnType<IReduxSelector>> = {};

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  public createOrUpdateState(
    key: string,
    typeInfo: ITypeInfo,
    defaultValue?: unknown
  ) {
    this.storeManager.dispatch(
      createOrUpdateState({ key, typeInfo, defaultValue })
    );
  }

  public removeState(key: string) {
    this.storeManager.dispatch(removeState({ key }));
  }

  public setState(key: string, value?: unknown) {
    this.storeManager.dispatch(setState({ key, value }));
  }

  public getStateSelector(key: string) {
    if (!this.selectorCache[key]) {
      this.selectorCache[key] = createDraftSafeSelector(
        (store: IStoreRootState) => store[StateManagerService][key]?.value,
        (value) => value
      );
    }

    return this.selectorCache[key];
  }

  public getAllStates(): IStateManagerSlice {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.storeManager.getState<any>()[
      StateManagerService
    ] as IStateManagerSlice;
  }
}

Weblancer.registerManager<IStateManagerActions>(StateManager);
