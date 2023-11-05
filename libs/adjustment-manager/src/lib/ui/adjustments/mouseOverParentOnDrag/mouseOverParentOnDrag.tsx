import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import {
  AdjustmentManagerService,
  IAdjustmentManagerActions,
  IStoreRootState,
} from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import { useSelector } from 'react-redux';
import styles from './mouseOverParentOnDrag.module.scss';
import { useEffect, useState } from 'react';

export const MouseOverParentOnDrag = () => {
  const adjustmentManager =
    useWeblancerEditorManager<IAdjustmentManagerActions>(AdjustmentManager);
  const hoveredContainerId = useSelector(
    (state: IStoreRootState) =>
      state[AdjustmentManagerService].hoveredContainerId
  );
  const draggingItemId = useSelector(
    (state: IStoreRootState) => state[AdjustmentManagerService].draggingItemId
  );
  const targetItemRef = adjustmentManager.getItemRootRef(
    hoveredContainerId ?? ''
  );

  const [itemRect, setItemRect] = useState<DOMRect>();

  useEffect(() => {
    if (!hoveredContainerId || !targetItemRef) {
      setItemRect(undefined);
      return;
    }

    const itemRect = targetItemRef.current?.getBoundingClientRect();
    setItemRect(itemRect);
  }, [hoveredContainerId, targetItemRef, draggingItemId]);

  if (!itemRect || !draggingItemId) return null;

  return (
    <div
      className={styles.root}
      style={{
        width: itemRect.width,
        height: itemRect.height,
        left: itemRect.left,
        top: itemRect.top,
      }}
    />
  );
};
