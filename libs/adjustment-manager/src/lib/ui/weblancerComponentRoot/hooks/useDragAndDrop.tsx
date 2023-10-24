import { useWeblancerManager } from '@weblancer-ui/editor-core';
import {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable';
import { IAdjustmentManagerActions } from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';

export const useDragAndDrop = (itemId: string) => {
  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  const handleDragStart: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    adjustmentManager.setDraggingItemId(itemId);
    e.stopPropagation();
  };

  const handleDragStop: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    adjustmentManager.setDraggingItemId(null);
  };

  return {
    draggableProps: {
      onStart: handleDragStart,
      onStop: handleDragStop,
    },
  };
};
