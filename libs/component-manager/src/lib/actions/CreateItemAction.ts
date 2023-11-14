import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { IComponentManagerActions } from '../types';
import { ComponentManager } from '../component-manager';
import { IPosition } from '@weblancer-ui/types';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import { importManager } from '@weblancer-ui/utils';

@importManager([UndoManager, ComponentManager, AdjustmentManager])
export class CreateItemAction extends EditorAction {
  public subject = 'Create Item';

  public get description() {
    return 'Create Item';
  }

  constructor(
    @inject(UndoManager) public undoManager: IUndoManagerActions,
    @inject(ComponentManager) public componentManager: IComponentManagerActions,
    @inject(AdjustmentManager)
    public adjustmentManager: IAdjustmentManagerActions
  ) {
    super(undoManager);
  }

  private componentKey!: string;
  private parentId!: string;
  private position!: IPosition;
  private itemId!: string;
  private oldSelectedItemId?: string | null;
  prepare(componentKey: string, parentId: string, position: IPosition) {
    this.componentKey = componentKey;
    this.parentId = parentId;
    this.position = position;
    return this;
  }

  public override execute(): void {
    this.oldSelectedItemId = this.adjustmentManager.getSelectedItemId();
    this.itemId = this.componentManager.createItem(
      this.componentKey,
      this.parentId,
      this.position,
      this.itemId,
      (itemId) => {
        this.adjustmentManager.setSelectedItemId(itemId);
      }
    );
  }

  public override undo(): void {
    this.componentManager.deleteItem(this.itemId);
    this.adjustmentManager.setSelectedItemId(this.oldSelectedItemId ?? null);
  }
}
