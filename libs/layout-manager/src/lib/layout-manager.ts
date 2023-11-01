/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IManager, IPosition } from '@weblancer-ui/types';
import { inject, injectable } from 'inversify';
import { ILayoutManagerActions, LayoutManagerService } from './types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import {
  IComponentData,
  IPropManagerActions,
  PropManager,
} from '@weblancer-ui/prop-manager';
import {
  AdjustmentManager,
  ComponentChildStyle,
  IAdjustmentManagerActions,
  IChildComponentTransform,
} from '@weblancer-ui/adjustment-manager';

@injectable()
export class LayoutManager extends IManager implements ILayoutManagerActions {
  public name = LayoutManagerService;

  constructor(
    @inject(PropManager) private propManager: IPropManagerActions,
    @inject(AdjustmentManager)
    private adjustmentManager: IAdjustmentManagerActions
  ) {
    super();
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

    if (oldParentComponentData) {
      this.propManager.updateComponent(newParentId, {
        childrenPropData: {
          ...newParentComponentData.childrenPropData,
          droppedItemId:
            oldParentComponentData.childrenPropData![droppedItemId],
        },
      });

      const tempOldParentChildren = {
        ...oldParentComponentData.childrenPropData,
      };
      delete tempOldParentChildren[droppedItemId];

      this.propManager.updateComponent(itemComponentData.parentId, {
        childrenPropData: tempOldParentChildren,
      });
    }

    this.propManager.updateComponent(droppedItemId, {
      parentId: newParentId,
    });

    // Wait for item to render in new component
    setTimeout(() => {
      this.setPositionInParent(droppedItemId, position);
    }, 0);
  }

  changeItemOrder(itemId: string, newIndex: number): void {
    const itemComponentData = this.propManager.getComponent(itemId)!;
    const parentComponentData = this.propManager.getComponent(
      itemComponentData.parentId
    )!;

    const keys = Object.keys(parentComponentData.childrenPropData!);
    const currentIndex = keys.indexOf(itemId);

    keys.splice(currentIndex, 1);
    keys.splice(newIndex, 0, itemId);

    const updatedChildren: typeof itemComponentData.childrenPropData = {};

    keys.forEach((key, index) => {
      updatedChildren[key] = parentComponentData.childrenPropData![key];
    });

    this.propManager.updateComponent(parentComponentData.id, {
      childrenPropData: updatedChildren,
    });
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

    this.propManager.deepAssignComponentProp<IChildComponentTransform>(
      itemId,
      ComponentChildStyle,
      {
        style: {
          marginLeft: `${data.x - parentRect.left}px`,
          marginTop: `${data.y - parentRect.top}px`,
        },
      }
    );
  }
}

weblancerRegistry.registerManager<ILayoutManagerActions>(LayoutManager);
