import { configureStore } from '@reduxjs/toolkit';
import { IEditorUIPlugin } from './IEditorUIPlugin';

export abstract class IManager<TManagerActions = unknown> {
  abstract name: string;
  abstract uiPlugin?: IEditorUIPlugin;

  public store?: ReturnType<typeof configureStore>;

  public addStore(store: ReturnType<typeof configureStore>) {
    this.store = store;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract init(managers: IManager<unknown>[]): void;

  public getActions(): TManagerActions {
    return this as unknown as TManagerActions;
  }
}

export abstract class IManagerWithUiPlugin<
  TManagerActions = unknown
> extends IManager<TManagerActions> {
  abstract override uiPlugin: IEditorUIPlugin;
}
