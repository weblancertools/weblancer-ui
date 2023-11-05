import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import {
  AdjustmentManagerService,
  IAdjustmentManagerActions,
  IStoreRootState,
} from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import { useSelector } from 'react-redux';
import styles from './mouseOver.module.scss';
import { useEffect, useState } from 'react';

export const MouseOver = () => {
  const adjustmentManager =
    useWeblancerEditorManager<IAdjustmentManagerActions>(AdjustmentManager);
  const mouseOverItemId = useSelector(
    (state: IStoreRootState) => state[AdjustmentManagerService].mouseOverItemId
  );
  const draggingItemId = useSelector(
    (state: IStoreRootState) => state[AdjustmentManagerService].draggingItemId
  );
  const targetItemRef = adjustmentManager.getItemRootRef(
    draggingItemId ?? mouseOverItemId ?? ''
  );

  const [itemRect, setItemRect] = useState<DOMRect>();

  useEffect(() => {
    // TODO must show the rect on dragging item
    if (!mouseOverItemId || !targetItemRef || draggingItemId) {
      setItemRect(undefined);
      return;
    }

    const itemRect = targetItemRef.current?.getBoundingClientRect();
    setItemRect(itemRect);
  }, [mouseOverItemId, targetItemRef, draggingItemId]);

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
