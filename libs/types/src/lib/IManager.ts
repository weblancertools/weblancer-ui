import { injectable } from 'inversify';
import { IEditorUIPlugin } from './IEditorUIPlugin';
import { IReduxStore } from './IReduxStore';

@injectable()
export abstract class IManager<TStoreState = unknown> {
  abstract name: string;

  public store?: IReduxStore<TStoreState>;

  public addStore(store: IReduxStore) {
    this.store = store;
  }
}

export abstract class IManagerWithUiPlugin<
  TManagerActions = unknown
> extends IManager<TManagerActions> {
  abstract uiPlugin: IEditorUIPlugin;
}
