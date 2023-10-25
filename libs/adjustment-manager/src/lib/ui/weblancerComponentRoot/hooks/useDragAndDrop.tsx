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
import {
  IAdjustmentManagerActions,
  IChildComponentTransform,
} from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import { useRef } from 'react';
import { useFrame } from 'react-frame-component';

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
  const { isDraggable = true, childComponentTransform } = options;

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
    // test
    data.node.style.marginLeft = `${
      data.x -
      itemRectAndPointerOffset.current!.x -
      (parentRect.current?.left ?? 0)
    }px`;
    data.node.style.marginTop = `${
      data.y -
      itemRectAndPointerOffset.current!.y -
      (parentRect.current?.top ?? 0)
    }px`;

    // TODO update childComponentTransform and save it to the propManager
  };

  const destroyClone = () => {
    clonedNodeRef.current!.remove();
  };

  const handleDragStop: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    adjustmentManager.setDraggingItemId(null);

    data.node.style.visibility = 'visible';

    autoDockingOnStop(data);
    destroyClone();
  };

  return {
    draggableProps: {
      onStart: handleDragStart,
      onStop: handleDragStop,
      onDrag: handleDrag,
    },
  };
};
