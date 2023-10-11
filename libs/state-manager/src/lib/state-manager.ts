import {
  IEditorUIPlugin,
  ITypeInfo,
  IManager,
  IReduxSelector,
} from '@weblancer-ui/types';
import { createState, setState } from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { STATE_MANAGER_NAME } from './constants';
import { IStoreRootState } from './types';
import { injectable } from 'inversify';
import {
  IStateManagerActions,
  IStateManagerSlice,
  StateManagerService,
  weblancerRegistry,
} from '@weblancer-ui/manager-registry';

@injectable()
export class StateManager
  extends IManager<IStoreRootState>
  implements IStateManagerActions
{
  public name = STATE_MANAGER_NAME;
  public uiPlugin?: IEditorUIPlugin;
  private selectorCache: Record<string, ReturnType<IReduxSelector>> = {};

  constructor() {
    super();
    // TODO
  }

  public createState(key: string, typeInfo: ITypeInfo, defaultValue?: unknown) {
    this.store?.dispatch(createState({ key, typeInfo, defaultValue }));
  }

  public setState(key: string, value?: unknown) {
    this.store?.dispatch(setState({ key, value }));
  }

  public getStateSelector(key: string) {
    if (!this.selectorCache[key]) {
      this.selectorCache[key] = createDraftSafeSelector(
        (store: IStoreRootState) => store[STATE_MANAGER_NAME][key]?.value,
        (value) => value
      );
    }

    return this.selectorCache[key];
  }

  public getAllStates(): IStateManagerSlice {
    const sliceState = this.store?.getState()?.[STATE_MANAGER_NAME];
    if (sliceState) return sliceState;

    throw new Error('Call getAllStates after initialization');
  }

  static getInstance() {
    return weblancerRegistry.getManagerInstance<StateManager>(
      StateManagerService
    );
  }
}

weblancerRegistry
  .registerManager<IStateManagerActions>(StateManager, StateManagerService)
  .inSingletonScope();
