import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { IAdjustmentManagerActions } from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import styles from './mouseOver.module.scss';
import { useEffect, useState } from 'react';
import { useAdjustmentVersion } from '../../../hooks/useAdjustmentVersion';

export const MouseOver = () => {
  const adjustmentManager =
    useWeblancerEditorManager<IAdjustmentManagerActions>(AdjustmentManager);

  const { draggingItemId, mouseOverItemId, version } = useAdjustmentVersion();

  const targetItemRef = adjustmentManager.getItemRootRef(
    draggingItemId ?? mouseOverItemId ?? ''
  );

  const [itemRect, setItemRect] = useState<DOMRect>();

  useEffect(() => {
    if (!mouseOverItemId || !targetItemRef || draggingItemId) {
      setItemRect(undefined);
      return;
    }

    const itemRect = targetItemRef.current?.getBoundingClientRect();
    setItemRect(itemRect);
  }, [targetItemRef, version, draggingItemId, mouseOverItemId]);

  if (!itemRect) return null;

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
