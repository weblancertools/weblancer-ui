/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IManager } from '@weblancer-ui/types';
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
  IAdjustmentManagerActions,
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

  handleItemDrop(droppedItemId: string, newParentId: string): void {
    const itemComponentData = this.propManager.getComponent(droppedItemId);
    const oldParentComponentData = this.propManager.getComponent(
      itemComponentData.parentId
    );
    const newParentComponentData = this.propManager.getComponent(newParentId);

    itemComponentData.parentId = newParentId;

    this.propManager.updateComponent(newParentId, {
      parentId: newParentComponentData.parentId,
      name: newParentComponentData.name,
      childrenPropData: {
        ...newParentComponentData.childrenPropData,
        droppedItemId: oldParentComponentData.childrenPropData![droppedItemId],
      },
    });

    const tempOldParentChildren = {
      ...oldParentComponentData.childrenPropData,
    };
    delete tempOldParentChildren[droppedItemId];

    this.propManager.updateComponent(itemComponentData.parentId, {
      parentId: oldParentComponentData.parentId,
      name: oldParentComponentData.name,
      childrenPropData: tempOldParentChildren,
    });

    this.propManager.updateComponent(droppedItemId, {
      parentId: newParentId,
      name: itemComponentData.name,
      childrenPropData: itemComponentData.childrenPropData,
    });

    const itemRootDiv = this.adjustmentManager.getItemRootRef(droppedItemId);
    const newParentRootDiv = this.adjustmentManager.getItemRootRef(newParentId);

    // TODO update transform data based on its new position in new parent
  }

  changeItemOrder(itemId: string, newIndex: number): void {
    const itemComponentData = this.propManager.getComponent(itemId);
    const parentComponentData = this.propManager.getComponent(
      itemComponentData.parentId
    );

    const keys = Object.keys(parentComponentData.childrenPropData!);
    const currentIndex = keys.indexOf(itemId);

    keys.splice(currentIndex, 1);
    keys.splice(newIndex, 0, itemId);

    const updatedChildren: typeof itemComponentData.childrenPropData = {};

    keys.forEach((key, index) => {
      updatedChildren[key] = parentComponentData.childrenPropData![key];
    });

    // TODO update childrenPropData for parent. propManager.updateComponentData
  }
}

weblancerRegistry.registerManager<ILayoutManagerActions>(LayoutManager);
