import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { findFirstWeblancerRootId } from './helpers';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';

interface IUseMouseEventsHandlerOptions {
  isContainer?: boolean;
}

export const useMouseEventsHandler = (
  itemId: string,
  options: IUseMouseEventsHandlerOptions = {}
) => {
  const { isContainer = false } = options;

  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (adjustmentManager.getMouseOverItemId() === itemId) {
      adjustmentManager.setMouseOverItemId(null);
    }

    if (isContainer && adjustmentManager.getHoveredContainerId() === itemId) {
      adjustmentManager.setHoveredContainerId(null);
    }
  };

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const firstWeblancerComponentRootId = findFirstWeblancerRootId(
      e.target as HTMLElement
    );

    if (firstWeblancerComponentRootId === itemId) {
      adjustmentManager.setMouseOverItemId(itemId);
    }

    if (isContainer) {
      adjustmentManager.setHoveredContainerId(itemId);
      e.stopPropagation();
    }
  };

  return {
    mouseEventProps: {
      onMouseLeave,
      onMouseOver,
    },
  };
};
