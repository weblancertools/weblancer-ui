/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'inversify';
import { IUndoManagerActions } from '../types';
import { UndoManager } from '../undo-manager';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { importManager } from '@weblancer-ui/utils';

@injectable()
@importManager(UndoManager)
export abstract class EditorAction {
  public abstract subject: string;
  public abstract get description(): string;
  constructor(@inject(UndoManager) public undoManager: IUndoManagerActions) {}

  public abstract execute(): void;
  public abstract undo(): void;

  public perform() {
    this.undoManager.registerAndExecuteAction(this);
  }

  public abstract prepare(...args: any[]): EditorAction;

  public static getActionInstance<Type>(_actionClass: {
    new (...args: any[]): Type;
  }) {
    return Weblancer.getHandlerInstance<Type>(_actionClass);
  }

  public static bindAction(_actionClass: any) {
    Weblancer.bindHandler(_actionClass);
  }
}
