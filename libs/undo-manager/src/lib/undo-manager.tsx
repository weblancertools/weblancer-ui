/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  weblancerContainer,
  weblancerRegistry,
} from '@weblancer-ui/manager-registry';
import { IManager } from '@weblancer-ui/types';
import { injectable } from 'inversify';
import { IUndoManagerActions } from './types';
import { UndoManagerService } from './constants';
import { UndoableAction } from './action/UndoableAction';

@injectable()
export class UndoManager extends IManager implements IUndoManagerActions {
  public name = UndoManagerService;

  public undoList: UndoableAction[] = [];
  public redoList: UndoableAction[] = [];

  public registerAndExecuteAction(action: UndoableAction): void {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getActionInstance<Type>(_actionClass: any) {
    return weblancerContainer.get<Type>(_actionClass);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static bindAction(_actionClass: any) {
    weblancerContainer.bind(_actionClass).toSelf();
  }
}

weblancerRegistry.registerManager<IUndoManagerActions>(UndoManager);
