import { Weblancer } from '@weblancer-ui/manager-registry';
import { EditorAction } from './EditorAction';
import { UndoManager } from '../undo-manager';
import { IUndoManagerActions } from '../types';
import { importManager } from '@weblancer-ui/utils';

@importManager(UndoManager)
export class BatchAction extends EditorAction {
  public subject = 'Batch Action';

  public get description() {
    return 'Update Component Prop';
  }

  private actions: EditorAction[] = [];

  public prepare(
    actions: EditorAction[],
    subject = 'Batch Action'
  ): EditorAction {
    this.actions = [...actions];
    this.subject = subject;

    return this;
  }

  public execute(): void {
    this.actions.forEach((action) => {
      action.execute();
    });
  }

  public undo(): void {
    [...this.actions].reverse().forEach((action) => {
      action.undo();
    });
  }

  public static batchPerform(
    actions: EditorAction[],
    subject = 'Batch Action'
  ) {
    const batchAction = Weblancer.getHandlerInstance<BatchAction>(BatchAction);
    batchAction.prepare(actions, subject);

    const undoManager =
      Weblancer.getManagerInstance<IUndoManagerActions>(UndoManager);

    undoManager.registerAndExecuteAction(batchAction);
  }
}

EditorAction.bindAction(BatchAction);
