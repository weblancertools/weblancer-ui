import { EditorAction } from './action/EditorAction';

export interface IUndoManagerActions {
  registerAndExecuteAction(action: EditorAction): void;
  undo(): void;
  redo(): void;
}
