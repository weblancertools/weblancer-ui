/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import { inject, injectable } from 'inversify';
import { IUndoManagerActions } from './types';
import { UndoManagerService } from './constants';
import { EditorAction } from './action/EditorAction';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import undoSlice, { setRedo, setUndo } from './slice/undoSlice';

@injectable()
export class UndoManager
  extends IManagerWithStore
  implements IUndoManagerActions
{
  public sliceReducer = undoSlice;

  public name = UndoManagerService;

  public undoList: EditorAction[] = [];
  public redoList: EditorAction[] = [];

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  private setUndo(hasUndo: boolean) {
    this.storeManager.dispatch(setUndo(hasUndo));
  }

  private setRedo(hasRedo: boolean) {
    this.storeManager.dispatch(setRedo(hasRedo));
  }

  public registerAndExecuteAction(action: EditorAction): void {
    this.redoList = [];
    this.undoList.push(action);

    this.setUndo(true);

    action.execute();
  }

  public undo() {
    if (this.undoList.length === 0) {
      return;
    }

    const action = this.undoList.pop();
    this.redoList.push(action!);
    this.setRedo(true);

    if (this.undoList.length === 0) {
      this.setUndo(false);
    }

    action!.undo();
  }

  public redo() {
    if (this.redoList.length === 0) {
      return;
    }

    const action = this.redoList.pop();
    this.undoList.push(action!);
    this.setUndo(true);

    if (this.redoList.length === 0) {
      this.setRedo(false);
    }

    action!.execute();
  }
}

weblancerRegistry.registerManager<IUndoManagerActions>(UndoManager);
