import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { EditorAction } from './action/EditorAction';
import { UndoManagerService } from './constants';

export interface IStoreRootState {
  [UndoManagerService]: IUndoManagerSlice;
  [key: string]: unknown;
}

export interface IUndoManagerSlice {
  hasUndo: boolean;
  hasRedo: boolean;
}

export interface IUndoManagerActions {
  registerAndExecuteAction(action: EditorAction): void;
  clear(): void;
  undo(): void;
  redo(): void;
}

export const useUndoManagerSelector: TypedUseSelectorHook<IStoreRootState> =
  useSelector;
