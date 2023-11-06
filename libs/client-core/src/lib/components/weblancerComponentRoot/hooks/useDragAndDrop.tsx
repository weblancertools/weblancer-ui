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
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import {
  DragManager,
  IDragManagerActions,
} from '../../../managers/dragManager/dragManager';

interface IUseDragAndDropOptions {
  isDraggable?: boolean;
}

export const useDragAndDrop = (
  itemId: string,
  options: IUseDragAndDropOptions = {}
) => {
  const { isDraggable = true } = options;
  const { document } = useWeblancerClientContext();

  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  const dragManager = useWeblancerManager<IDragManagerActions>(DragManager);

  const handleDragStart: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    if (!isDraggable) return false;

    dragManager.handleStart(e, data, itemId, document);
  };

  const handleDrag: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    dragManager.handleDrag(e, data);
  };

  const handleDragStop: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    dragManager.handleStop(e, data);
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
