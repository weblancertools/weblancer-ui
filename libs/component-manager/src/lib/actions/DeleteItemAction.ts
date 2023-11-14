/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { IComponentManagerActions } from '../types';
import { ComponentManager } from '../component-manager';
import { IPosition } from '@weblancer-ui/types';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import { importManager } from '@weblancer-ui/utils';

// TODO integration test
@importManager([UndoManager, ComponentManager, AdjustmentManager, PropManager])
export class DeleteItemAction extends EditorAction {
  public subject = 'Delete Item';

  public get description() {
    return 'Delete Item';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(ComponentManager) public componentManager: IComponentManagerActions,
    @inject(PropManager) public propManager: IPropManagerActions,
    @inject(AdjustmentManager)
    public adjustmentManager: IAdjustmentManagerActions
  ) {
    super(undoManager);
  }

  private itemId!: string;
  private componentKey!: string;
  private parentId!: string;
  private position!: IPosition;
  prepare(itemId: string) {
    this.itemId = itemId;
    return this;
  }

  public override execute(): void {
    const componentData = this.propManager.getComponent(this.itemId)!;

    this.componentKey = componentData.componentKey;
    this.parentId = componentData.parentId;

    const itemRootDiv = this.adjustmentManager.getItemRootRef(
      this.itemId
    ).current;
    const itemRect = itemRootDiv!.getBoundingClientRect();

    this.position = {
      x: itemRect.left,
      y: itemRect.top,
    };

    this.componentManager.deleteItem(this.itemId);
  }

  public override undo(): void {
    this.componentManager.createItem(
      this.componentKey,
      this.parentId,
      this.position,
      this.itemId
    );
  }
}
