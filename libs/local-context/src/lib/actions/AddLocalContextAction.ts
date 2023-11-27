import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { importManager } from '@weblancer-ui/utils';
import { inject, injectable } from 'inversify';
import { ILocalContextAction } from '../types';
import { LocalContext } from '../local-context';

@injectable()
@importManager([UndoManager, LocalContext])
export class AddLocalContextAction extends EditorAction {
  public subject = 'Add Local Context';

  public get description() {
    return 'Add Local Context';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(LocalContext) public localContext: ILocalContextAction
  ) {
    super(undoManager);
  }

  private itemId!: string;
  private contextKey!: string;
  public prepare(itemId: string, contextKey: string): EditorAction {
    this.itemId = itemId;
    this.contextKey = contextKey;
    return this;
  }

  public execute(): void {
    this.localContext.addContextToItem(this.itemId, this.contextKey);
  }
  public undo(): void {
    this.localContext.removeContextFromItem(this.itemId, this.contextKey);
  }
}
