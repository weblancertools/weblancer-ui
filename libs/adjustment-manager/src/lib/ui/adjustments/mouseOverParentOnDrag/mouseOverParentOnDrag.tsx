import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IAdjustmentManagerActions } from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import styles from './mouseOverParentOnDrag.module.scss';
import { useEffect, useState } from 'react';
import { useAdjustmentVersion } from '../../../hooks/useAdjustmentVersion';

export const MouseOverParentOnDrag = () => {
  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  const { draggingItemId, hoveredContainerId, version } =
    useAdjustmentVersion();

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
  }, [hoveredContainerId, targetItemRef, draggingItemId, version]);

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
