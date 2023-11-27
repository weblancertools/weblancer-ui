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
export class RemoveLocalContextAction extends EditorAction {
  public subject = 'Remove Local Context';

  public get description() {
    return 'Remove Local Context';
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

  private oldInitialValue?: unknown;
  public execute(): void {
    this.oldInitialValue = this.localContext.getItemContextInitialValue(
      this.itemId,
      this.contextKey
    );

    this.localContext.removeContextFromItem(this.itemId, this.contextKey);
  }

  public undo(): void {
    this.localContext.addContextToItem(this.itemId, this.contextKey);

    this.localContext.updateItemContextInitialValue(
      this.itemId,
      this.contextKey,
      this.oldInitialValue
    );
  }
}
