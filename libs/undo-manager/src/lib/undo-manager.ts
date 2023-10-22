/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import { IManager } from '@weblancer-ui/types';
import { injectable } from 'inversify';
import { IUndoManagerActions } from './types';
import { UndoManagerService } from './constants';
import { EditorAction } from './action/EditorAction';

@injectable()
export class UndoManager extends IManager implements IUndoManagerActions {
  public name = UndoManagerService;

  public undoList: EditorAction[] = [];
  public redoList: EditorAction[] = [];

  public registerAndExecuteAction(action: EditorAction): void {
    this.redoList = [];
    this.undoList.push(action);

    action.execute();
  }

  public undo() {
    if (this.undoList.length === 0) {
      return;
    }

    const action = this.undoList.pop();
    this.redoList.push(action!);

    action!.undo();
  }

  public redo() {
    if (this.redoList.length === 0) {
      return;
    }

    const action = this.redoList.pop();
    this.undoList.push(action!);

    action!.execute();
  }
}

weblancerRegistry.registerManager<IUndoManagerActions>(UndoManager);
