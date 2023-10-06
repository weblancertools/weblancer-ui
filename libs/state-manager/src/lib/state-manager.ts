import { IEditorUIPlugin, ITypeInfo, IManager } from '@weblancer-ui/types';
import { createState, setState } from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { STATE_MANAGER_NAME } from './constants';
import { IStateManagerActions, IStoreRootState } from './types';

export class StateManager
  extends IManager<IStateManagerActions>
  implements IStateManagerActions
{
  public name = STATE_MANAGER_NAME;
  public uiPlugin?: IEditorUIPlugin;
  public selectorCache: Record<
    string,
    ReturnType<typeof createDraftSafeSelector>
  > = {};

  public init(): void {
    // Nothing
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
}
