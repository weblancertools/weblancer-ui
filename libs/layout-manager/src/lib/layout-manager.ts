/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IComponentData, IManager, IPosition } from '@weblancer-ui/types';
import { inject, injectable } from 'inversify';
import { ILayoutManagerActions, LayoutManagerService } from './types';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import {
  AdjustmentManager,
  ComponentChildStyle,
  IAdjustmentManagerActions,
  IChildTransform,
} from '@weblancer-ui/adjustment-manager';
import { importManager } from '@weblancer-ui/utils';

@injectable()
@importManager([PropManager, AdjustmentManager])
export class LayoutManager extends IManager implements ILayoutManagerActions {
  public name = LayoutManagerService;
  private document?: Document;

  constructor(
    @inject(PropManager) private propManager: IPropManagerActions,
    @inject(AdjustmentManager)
    private adjustmentManager: IAdjustmentManagerActions
  ) {
    super();
  }

  setClientDocument(document?: Document): void {
    this.document = document;
  }

  getClientDocument(): Document {
    return this.document!;
  }

  getLayout(): Omit<IComponentData, 'parentId'> {
    return this.propManager.getPageData();
  }

  handleItemDrop(
    droppedItemId: string,
    newParentId: string,
    position: IPosition
  ): void {
    const itemComponentData = this.propManager.getComponent(droppedItemId)!;

    const oldParentComponentData = this.propManager.getComponent(
      itemComponentData.parentId
    );

    const newParentComponentData = this.propManager.getComponent(newParentId)!;

    if (!oldParentComponentData) throw new Error('Can not find old parent');

    this.propManager.updateComponent(newParentId, {
      children: [...(newParentComponentData.children ?? []), droppedItemId],
    });

    const tempOldParentChildren = [...(oldParentComponentData.children ?? [])];
    const indexToDelete = tempOldParentChildren.indexOf(droppedItemId);
    tempOldParentChildren.splice(indexToDelete, 1);

    this.propManager.updateComponent(itemComponentData.parentId, {
      children: tempOldParentChildren,
    });

    this.propManager.updateComponent(droppedItemId, {
      parentId: newParentId,
    });

    // Wait for item to render in new component
    setTimeout(() => {
      this.setPositionInParent(droppedItemId, position);
    }, 0);
  }

  changeItemOrder(itemId: string, newIndex: number): void {
    // const itemComponentData = this.propManager.getComponent(itemId)!;
    // const parentComponentData = this.propManager.getComponent(
    //   itemComponentData.parentId
    // )!;
    // const keys = Object.keys(parentComponentData.children!);
    // const currentIndex = keys.indexOf(itemId);
    // keys.splice(currentIndex, 1);
    // keys.splice(newIndex, 0, itemId);
    // const updatedChildren: typeof itemComponentData.children = {};
    // keys.forEach((key, index) => {
    //   updatedChildren[key] = parentComponentData.children![key];
    // });
    // this.propManager.updateComponent(parentComponentData.id, {
    //   children: updatedChildren,
    // });
  }

  setPositionInParent(
    itemId: string,
    data: IPosition & { node?: HTMLElement }
  ): void {
    data.node =
      data.node ??
      this.adjustmentManager.getItemRootRef(itemId)?.current ??
      undefined;

    if (!data.node) return;

    const itemComponentData = this.propManager.getComponent(itemId);
    if (!itemComponentData) return;

    const parentRootDiv = this.adjustmentManager.getItemRootRef(
      itemComponentData.parentId
    )?.current;
    if (!parentRootDiv) return;

    const parentRect = parentRootDiv.getBoundingClientRect();

    this.propManager.deepAssignComponentProp<IChildTransform>(
      itemId,
      ComponentChildStyle,
      {
        style: {
          marginLeft: `${
            data.x - parentRect.left + parentRootDiv.scrollLeft
          }px`,
          marginTop: `${data.y - parentRect.top + parentRootDiv.scrollTop}px`,
        },
      }
    );
  }
}
