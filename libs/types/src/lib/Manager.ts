import { configureStore } from '@reduxjs/toolkit';
import { IEditorUIPlugin } from './IEditorUIPlugin';

export abstract class Manager {
  abstract name: string;
  abstract uiPlugin?: IEditorUIPlugin;

  public store?: ReturnType<typeof configureStore>;

  public addStore(store: ReturnType<typeof configureStore>) {
    this.store = store;
  }

  abstract init(managers: Manager[]): void;
}

export abstract class ManagerWithUiPlugin extends Manager {
  abstract override uiPlugin: IEditorUIPlugin;
}
