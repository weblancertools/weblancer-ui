import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IAdjustmentManagerActions } from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import { findFirstWeblancerRootId } from './helpers';

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

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    adjustmentManager.setSelectedItemId(itemId);
    e.stopPropagation();
  };

  return {
    mouseEventProps: {
      onClick,
      onMouseLeave,
      onMouseOver,
    },
  };
};
