import { injectable } from 'inversify';
import { IEditorUIPlugin } from './IEditorUIPlugin';

@injectable()
export abstract class IManager {
  abstract name: string;
}

export abstract class IManagerWithUiPlugin extends IManager {
  abstract uiPlugin: IEditorUIPlugin;
}
