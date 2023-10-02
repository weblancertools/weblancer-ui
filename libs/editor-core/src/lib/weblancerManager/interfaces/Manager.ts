import { configureStore } from '@reduxjs/toolkit';
import { IEditorUIPlugin } from './IEditorUIPlugin';

export abstract class Manager {
  abstract name: string;
  public store?: ReturnType<typeof configureStore>;
  abstract uiPlugin?: IEditorUIPlugin;

  public addStore(store: ReturnType<typeof configureStore>) {
    this.store = store;
  }

  abstract init(managers: Manager[]): void;
}

export abstract class ManagerWithUiPlugin extends Manager {
  abstract uiPlugin: IEditorUIPlugin;
}
