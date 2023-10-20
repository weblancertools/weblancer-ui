import { UndoableAction } from './action/UndoableAction';

export interface IUndoManagerActions {
  registerAndExecuteAction(action: UndoableAction): void;
  undo(): void;
  redo(): void;
}
