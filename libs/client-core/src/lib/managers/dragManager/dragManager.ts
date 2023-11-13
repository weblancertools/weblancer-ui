import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import {
  ComponentManager,
  IComponentManagerActions,
} from '@weblancer-ui/component-manager';
import {
  DropItemAction,
  SetPositionAction,
} from '@weblancer-ui/layout-manager';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { IComponentMetadata, IManager, IPosition } from '@weblancer-ui/types';
import { EditorAction } from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { DraggableData, DraggableEvent } from 'react-draggable';

export interface IDragManagerActions {
  handleStart(
    e: DraggableEvent,
    data: DraggableData,
    itemId: string,
    document: Document
  ): void | false;
  handleDrag(e: DraggableEvent, data: DraggableData): void;
  handleStop(e: DraggableEvent, data: DraggableData): void;
}

export const DragManagerService = 'DragManager';

export class DragManager extends IManager implements IDragManagerActions {
  public name = DragManagerService;

  constructor(
    @inject(AdjustmentManager)
    private adjustmentManager: IAdjustmentManagerActions,
    @inject(PropManager)
    private propManager: IPropManagerActions,
    @inject(ComponentManager)
    private componentManager: IComponentManagerActions
  ) {
    super();
  }

  private clonedNode!: HTMLElement;
  private itemRect!: DOMRect;
  private itemRectAndPointerOffset!: IPosition;
  private parentId!: string;
  private itemId!: string;
  private metadata?: IComponentMetadata;

  handleStart(
    e: DraggableEvent,
    data: DraggableData,
    itemId: string,
    document: Document
  ): void | false {
    e.stopPropagation();

    const componentData = this.propManager.getComponent(itemId);

    if (!componentData) throw new Error('component not found');

    this.parentId = componentData?.parentId;
    this.itemId = itemId;

    this.metadata = this.componentManager.getMetadata(itemId) ?? {};

    if (this.isRestrictedOnAxis('y') && this.isRestrictedOnAxis('y'))
      return false;

    this.adjustmentManager.setDraggingItemId(itemId);

    this.prepareNode(data.node, data, document);
  }

  private prepareNode(
    node: HTMLElement,
    data: DraggableData,
    document: Document
  ) {
    const itemNode = this.adjustmentManager.getItemRootRef(this.itemId).current;
    if (!itemNode) throw new Error('item not found in DOM');

    this.itemRect = itemNode.getBoundingClientRect();

    this.clonedNode = node.cloneNode(true) as HTMLElement;
    node.style.visibility = 'hidden';

    document.body.appendChild(this.clonedNode);

    this.itemRectAndPointerOffset = {
      x: data.x - this.itemRect.left,
      y: data.y - this.itemRect.top,
    };

    this.clonedNode.style.position = 'absolute';
    this.clonedNode.style.zIndex = '9999999999';
    this.clonedNode.style.left = `${this.itemRect.left}px`;
    this.clonedNode.style.top = `${this.itemRect.top}px`;
    this.clonedNode.style.margin = `unset`;
    this.clonedNode.style.pointerEvents = `none`;

    const borderDiv = document.createElement('div');

    // Set the styles for the new div
    borderDiv.style.position = 'absolute';
    borderDiv.style.inset = '0px';
    borderDiv.style.border = '1px solid blue';

    this.clonedNode.appendChild(borderDiv);
  }

  handleDrag(e: DraggableEvent, data: DraggableData): void {
    if (!this.isRestrictedOnAxis('x')) {
      this.clonedNode.style.left = `${this.getAbsoluteX(data)}px`;
    }

    if (!this.isRestrictedOnAxis('y')) {
      this.clonedNode.style.top = `${this.getAbsoluteY(data)}px`;
    }

    this.autoDockingOnDrag(data);
  }

  private autoDockingOnDrag(data: DraggableData) {
    // TODO update adjustment view based on childComponentTransform
  }

  handleStop(e: DraggableEvent, data: DraggableData): void {
    this.adjustmentManager.setDraggingItemId(null);

    data.node.style.visibility = 'unset';

    this.destroyClone();
    if (!this.handleDropInNewParent(data)) {
      this.autoDockingOnStop(data);
    }
  }

  private destroyClone() {
    this.clonedNode.remove();
  }

  private handleDropInNewParent(data: DraggableData) {
    const newParentId = this.adjustmentManager.getHoveredContainerId();

    if (newParentId && newParentId !== this.parentId) {
      EditorAction.getActionInstance(DropItemAction)
        .prepare(this.itemId, newParentId, {
          x: !this.isRestrictedOnAxis('x')
            ? this.getAbsoluteX(data)
            : this.itemRect.left,
          y: !this.isRestrictedOnAxis('y')
            ? this.getAbsoluteY(data)
            : this.itemRect.top,
        })
        .perform();

      return true;
    }

    return false;
  }

  private autoDockingOnStop(data: DraggableData) {
    EditorAction.getActionInstance(SetPositionAction)
      .prepare(this.itemId, {
        x: !this.isRestrictedOnAxis('x')
          ? this.getAbsoluteX(data)
          : this.itemRect.left,
        y: !this.isRestrictedOnAxis('y')
          ? this.getAbsoluteY(data)
          : this.itemRect.top,
      })
      .perform();
  }

  private isRestrictedOnAxis(axis: 'x' | 'y') {
    if (this.metadata?.dragging?.restrictedMovementAxises) {
      if (this.metadata.dragging.restrictedMovementAxises.includes(axis))
        return true;
    }

    const parentMetaData = this.componentManager.getMetadata(this.parentId);

    if (parentMetaData?.dragging?.childrenRestrictedMovementAxises) {
      if (
        parentMetaData.dragging.childrenRestrictedMovementAxises.includes(axis)
      )
        return true;
    }

    return false;
  }

  private getAbsoluteX(data: DraggableData) {
    return data.x - this.itemRectAndPointerOffset.x;
  }

  private getAbsoluteY(data: DraggableData) {
    return data.y - this.itemRectAndPointerOffset.y;
  }
}

Weblancer.registerManager<IDragManagerActions>(DragManager);
