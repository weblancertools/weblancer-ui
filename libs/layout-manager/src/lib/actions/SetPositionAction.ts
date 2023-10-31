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

export class SetPositionAction extends EditorAction {
  public subject = 'Set Position';

  public get description() {
    return 'Set Position';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(LayoutManager) public layoutManager: ILayoutManagerActions,
    @inject(AdjustmentManager)
    public adjustmentManager: IAdjustmentManagerActions
  ) {
    super(undoManager);
  }

  private itemId!: string;
  private data!: IPosition & {
    node?: HTMLElement | undefined;
  };
  private previewsData!: IPosition & {
    node?: HTMLElement | undefined;
  };
  prepare(
    itemId: string,
    data: IPosition & {
      node?: HTMLElement | undefined;
    }
  ) {
    this.itemId = itemId;
    this.data = data;
    return this;
  }

  public override execute(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const itemRootDiv = this.adjustmentManager.getItemRootRef(this.itemId)
      .current!;
    const itemRect = itemRootDiv.getBoundingClientRect();

    this.previewsData = {
      node: this.data.node,
      x: itemRect.left,
      y: itemRect.top,
    };

    this.layoutManager.setPositionInParent(this.itemId, this.data);
  }

  public override undo(): void {
    this.layoutManager.setPositionInParent(this.itemId, this.previewsData);
  }
}

EditorAction.bindAction(SetPositionAction);
