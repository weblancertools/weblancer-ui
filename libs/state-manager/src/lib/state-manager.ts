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

  public init(): void {
    // TODO
  }

  public createState(key: string, typeInfo: ITypeInfo, defaultValue?: unknown) {
    this.store?.dispatch(createState({ key, typeInfo, defaultValue }));
  }

  public setState(key: string, value?: unknown) {
    this.store?.dispatch(setState({ key, value }));
  }

  public getStateSelector(key: string) {
    return createDraftSafeSelector(
      (store: IStoreRootState) => store[STATE_MANAGER_NAME][key]?.value,
      (value) => value
    );
  }
}
