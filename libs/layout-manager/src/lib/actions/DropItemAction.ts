/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { IPosition } from '@weblancer-ui/types';
import { ILayoutManagerActions } from '../types';
import { LayoutManager } from '../layout-manager';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';

export class DropItemAction extends EditorAction {
  public subject = 'Drop Item';

  public get description() {
    return 'Drop Item';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(LayoutManager) public layoutManager: ILayoutManagerActions,
    @inject(AdjustmentManager)
    public adjustmentManager: IAdjustmentManagerActions,
    @inject(PropManager) public propManager: IPropManagerActions
  ) {
    super(undoManager);
  }

  private droppedItemId!: string;
  private newParentId!: string;
  private position!: IPosition;
  private oldParentId!: string;
  private oldPosition!: IPosition;
  prepare(droppedItemId: string, newParentId: string, position: IPosition) {
    this.droppedItemId = droppedItemId;
    this.newParentId = newParentId;
    this.position = position;
    return this;
  }

  public override execute(): void {
    const itemData = this.propManager.getComponent(this.droppedItemId)!;
    const itemRootDiv = this.adjustmentManager.getItemRootRef(
      this.droppedItemId
    ).current;
    const itemRect = itemRootDiv!.getBoundingClientRect();

    this.oldPosition = { x: itemRect.left, y: itemRect.top };
    this.oldParentId = itemData.parentId;

    this.layoutManager.handleItemDrop(
      this.droppedItemId,
      this.newParentId,
      this.position
    );
  }

  public override undo(): void {
    this.layoutManager.handleItemDrop(
      this.droppedItemId,
      this.oldParentId,
      this.oldPosition
    );
  }
}

EditorAction.bindAction(DropItemAction);
