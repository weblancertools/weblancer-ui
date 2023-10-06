import { IEditorUIPlugin, ITypeInfo, IManager } from '@weblancer-ui/types';
import { createState, setState } from './slice/stateSlice';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { STATE_MANAGER_NAME } from './constants';
import { IStoreRootState } from './types';

export class StateManager extends IManager {
  public name = STATE_MANAGER_NAME;
  public uiPlugin?: IEditorUIPlugin;

  public init(): void {
    // TODO
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public createState(key: string, typeInfo: ITypeInfo, defaultValue?: any) {
    this.store?.dispatch(createState({ key, typeInfo, defaultValue }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setState(key: string, value?: any) {
    this.store?.dispatch(setState({ key, value }));
  }

  public getStateSelector(key: string) {
    return createDraftSafeSelector(
      (store: IStoreRootState) => store[STATE_MANAGER_NAME][key]?.value,
      (value) => value
    );
  }
}
