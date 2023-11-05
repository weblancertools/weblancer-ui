import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import {
  AdjustmentManagerService,
  IAdjustmentManagerActions,
  useAdjustmentManagerSelector,
} from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import styles from './selected.module.scss';
import { useEffect, useState } from 'react';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { ComponentChildStyle } from '../../../constants';
import { useSelector } from 'react-redux';

export const Selected = () => {
  const adjustmentManager =
    useWeblancerEditorManager<IAdjustmentManagerActions>(AdjustmentManager);
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const selectedItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].selectedItemId
  );
  const draggingItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].draggingItemId
  );

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
  }, [selectedItemId, selectedItemRef, componentData, draggingItemId]);

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