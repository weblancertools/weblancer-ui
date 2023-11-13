import {
  AdjustmentManagerService,
  useAdjustmentManagerSelector,
} from '../types';

export const useAdjustmentVersion = () => {
  const selectedItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].selectedItemId
  );
  const hoveredContainerId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].hoveredContainerId
  );
  const mouseOverItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].mouseOverItemId
  );
  const draggingItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].draggingItemId
  );

  const scrollHash = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].scrollHash
  );

  return {
    mouseOverItemId,
    draggingItemId,
    scrollHash,
    hoveredContainerId,
    selectedItemId,
    version:
      (mouseOverItemId ?? '') +
      draggingItemId +
      scrollHash +
      hoveredContainerId +
      selectedItemId,
  };
};
