import { IEditorUIPlugin } from './IEditorUIPlugin';
import { IReduxStore } from './IReduxStore';

export abstract class IManager<
  TManagerActions = unknown,
  TStoreState = unknown
> {
  abstract name: string;

  public store?: ReturnType<IReduxStore<TStoreState>>;

  public addStore(store: ReturnType<IReduxStore>) {
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
  abstract uiPlugin: IEditorUIPlugin;
}
