import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { IComponentManagerActions } from '../types';
import { ComponentManager } from '../component-manager';
import { IPosition } from '@weblancer-ui/types';

export class CreateItemAction extends EditorAction {
  public subject = 'Create Item';

  public get description() {
    return 'Create Item';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(ComponentManager) public componentManager: IComponentManagerActions
  ) {
    super(undoManager);
  }

  private componentKey!: string;
  private parentId!: string;
  private position!: IPosition;
  private itemId!: string;
  prepare(componentKey: string, parentId: string, position: IPosition) {
    this.componentKey = componentKey;
    this.parentId = parentId;
    this.position = position;
    return this;
  }

  public override execute(): void {
    this.componentManager.createItem(
      this.componentKey,
      this.parentId,
      this.position,
      this.itemId,
      (itemId) => {
        this.itemId = itemId;
      }
    );
  }

  public override undo(): void {
    this.componentManager.deleteItem(this.itemId);
  }
}

EditorAction.bindAction(CreateItemAction);
