import { IEditorUIPlugin, ITypeInfo, IManager } from '@weblancer-ui/types';
import { IStateManagerSlice, createState, setState } from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { STATE_MANAGER_NAME } from './constants';
import { IReduxSelector, IStateManagerActions, IStoreRootState } from './types';
import { injectable } from 'inversify';
import { weblancerContainer } from '@weblancer-ui/editor-core';

@injectable()
export class StateManager
  extends IManager<IStoreRootState>
  implements IStateManagerActions
{
  public name = STATE_MANAGER_NAME;
  public uiPlugin?: IEditorUIPlugin;
  private selectorCache: Record<string, ReturnType<IReduxSelector>> = {};

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
    return weblancerContainer.get<StateManager>(StateManager);
  }
}

weblancerContainer
  .bind<IStateManagerActions>(StateManager)
  .toSelf()
  .inSingletonScope();
