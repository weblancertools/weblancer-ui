import { ITypeInfo, IReduxSelector } from '@weblancer-ui/types';
import stateSlice, { createState, setState } from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import {
  IStateManagerActions,
  IStateManagerSlice,
  IStoreRootState,
} from './types';
import { inject, injectable } from 'inversify';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { StateManagerService } from './constants';

@injectable()
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

  public createState(key: string, typeInfo: ITypeInfo, defaultValue?: unknown) {
    this.storeManager.dispatch(createState({ key, typeInfo, defaultValue }));
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

weblancerRegistry.registerManager<IStateManagerActions>(StateManager);
