import { configureStore } from '@reduxjs/toolkit';
import { IEditorUIPlugin } from './IEditorUIPlugin';

export abstract class IManager {
  abstract name: string;
  abstract uiPlugin?: IEditorUIPlugin;

  public store?: ReturnType<typeof configureStore>;

  public addStore(store: ReturnType<typeof configureStore>) {
    this.store = store;
  }

  abstract init(managers: IManager[]): void;
}

export abstract class IManagerWithUiPlugin extends IManager {
  abstract override uiPlugin: IEditorUIPlugin;
}
