import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IAdjustmentManagerActions } from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import styles from './selected.module.scss';
import { useEffect, useState } from 'react';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { useSelector } from 'react-redux';
import { useAdjustmentVersion } from '../../../hooks/useAdjustmentVersion';

export const Selected = () => {
  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);

  const { draggingItemId, selectedItemId, version } = useAdjustmentVersion();

  const componentData = useSelector(
    propManager.getComponentChangeSelector(selectedItemId ?? '')
  );

  const selectedItemRef = adjustmentManager.getItemRootRef(
    selectedItemId ?? ''
  );

  const [itemRect, setItemRect] = useState<DOMRect>();

  useEffect(() => {
    if (!selectedItemId || !selectedItemRef || draggingItemId) {
      setItemRect(undefined);
      return;
    }

    const itemRect = selectedItemRef.current?.getBoundingClientRect();
    setItemRect(itemRect);
  }, [selectedItemId, selectedItemRef, componentData, draggingItemId, version]);

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
