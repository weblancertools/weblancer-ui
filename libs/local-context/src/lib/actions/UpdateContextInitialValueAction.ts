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
export class UpdateContextInitialValueAction extends EditorAction {
  public subject = 'Update Context Initial Value';

  public get description() {
    return 'Update Context Initial Value';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(LocalContext) public localContext: ILocalContextAction
  ) {
    super(undoManager);
  }

  private itemId!: string;
  private contextKey!: string;
  private initialValue!: unknown;
  public prepare(
    itemId: string,
    contextKey: string,
    initialValue: unknown
  ): EditorAction {
    this.itemId = itemId;
    this.contextKey = contextKey;
    this.initialValue = initialValue;
    return this;
  }

  private oldInitialValue?: unknown;
  public execute(): void {
    this.oldInitialValue = this.localContext.getItemContextInitialValue(
      this.itemId,
      this.contextKey
    );

    this.localContext.updateItemContextInitialValue(
      this.itemId,
      this.contextKey,
      this.initialValue
    );
  }

  public undo(): void {
    this.localContext.updateItemContextInitialValue(
      this.itemId,
      this.contextKey,
      this.oldInitialValue
    );
  }
}
