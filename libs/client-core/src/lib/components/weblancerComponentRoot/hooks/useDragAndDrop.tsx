/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  useWeblancerClientContext,
  useWeblancerManager,
} from '@weblancer-ui/editor-core';
import {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable';
import { useRef } from 'react';
import {
  DropItemAction,
  SetPositionAction,
} from '@weblancer-ui/layout-manager';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
  IChildComponentTransform,
} from '@weblancer-ui/adjustment-manager';
import { EditorAction } from '@weblancer-ui/undo-manager';

interface IUseDragAndDropOptions {
  isDraggable?: boolean;
  // use it for auto docking and end of dragging
  childComponentTransform?: IChildComponentTransform;
}

export const useDragAndDrop = (
  itemId: string,
  parentId: string,
  options: IUseDragAndDropOptions = {}
) => {
  const { isDraggable = true } = options;

  const clonedNodeRef = useRef<HTMLElement>();
  const parentRect = useRef<DOMRect>();
  const itemRect = useRef<DOMRect>();
  const itemRectAndPointerOffset = useRef<{ x: number; y: number }>();
  const { document } = useWeblancerClientContext();

  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  const prepareNode = (node: HTMLElement, data: DraggableData) => {
    parentRect.current = adjustmentManager
      .getItemRootRef(parentId)
      ?.current!.getBoundingClientRect();

    itemRect.current = adjustmentManager
      .getItemRootRef(itemId)
      .current!.getBoundingClientRect();

    clonedNodeRef.current = node.cloneNode(true) as HTMLElement;
    node.style.visibility = 'hidden';

    document?.body.appendChild(clonedNodeRef.current);

    itemRectAndPointerOffset.current = {
      x: data.x - itemRect.current.left,
      y: data.y - itemRect.current.top,
    };

    clonedNodeRef.current!.style.position = 'absolute';
    clonedNodeRef.current!.style.zIndex = '9999999999';
    clonedNodeRef.current!.style.left = `${itemRect.current.left}px`;
    clonedNodeRef.current!.style.top = `${itemRect.current.top}px`;
    clonedNodeRef.current!.style.margin = `unset`;
    clonedNodeRef.current!.style.pointerEvents = `none`;
  };

  const handleDragStart: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    if (!isDraggable) return false;

    adjustmentManager.setDraggingItemId(itemId);
    e.stopPropagation();

    prepareNode(data.node, data);
  };

  const autoDockingOnDrag = (data: DraggableData) => {
    // TODO update adjustment view based on childComponentTransform
  };

  const handleDrag: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    clonedNodeRef.current!.style.left = `${
      data.x - itemRectAndPointerOffset.current!.x
    }px`;
    clonedNodeRef.current!.style.top = `${
      data.y - itemRectAndPointerOffset.current!.y
    }px`;

    autoDockingOnDrag(data);
  };

  const autoDockingOnStop = (data: DraggableData) => {
    EditorAction.getActionInstance(SetPositionAction)
      .prepare(itemId, {
        x: data.x - itemRectAndPointerOffset.current!.x,
        y: data.y - itemRectAndPointerOffset.current!.y,
      })
      .perform();
  };

  const destroyClone = () => {
    clonedNodeRef.current!.remove();
  };

  const handleDragStop: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    adjustmentManager.setDraggingItemId(null);

    data.node.style.visibility = 'unset';

    destroyClone();
    autoDockingOnStop(data);
    handleDrop(data);
  };

  const handleDrop = (data: DraggableData) => {
    const newParentId = adjustmentManager.getHoveredContainerId();
    if (newParentId && newParentId !== parentId) {
      EditorAction.getActionInstance(DropItemAction)
        .prepare(itemId, newParentId, {
          x: data.x - itemRectAndPointerOffset.current!.x,
          y: data.y - itemRectAndPointerOffset.current!.y,
        })
        .perform();
    }
  };

  const handleMouseDown = () => {
    adjustmentManager.setSelectedItemId(itemId);
  };

  return {
    draggableProps: {
      onStart: handleDragStart,
      onStop: handleDragStop,
      onDrag: handleDrag,
      onMouseDown: handleMouseDown,
    },
  };
};
