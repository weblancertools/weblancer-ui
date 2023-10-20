import { inject } from 'inversify';
import { UndoManager } from '../undo-manager';
import { IUndoManagerActions } from '../types';

export abstract class UndoableAction {
  public abstract subject: string;
  public abstract get description(): string;
  constructor(@inject(UndoManager) private undoManager: IUndoManagerActions) {}

  public abstract execute(): void;
  public abstract undo(): void;

  public perform() {
    this.undoManager.registerAndExecuteAction(this);
  }
}
