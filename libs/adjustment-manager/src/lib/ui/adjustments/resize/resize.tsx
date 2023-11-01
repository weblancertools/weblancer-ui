import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import {
  AdjustmentManagerService,
  IAdjustmentManagerActions,
  IChildComponentTransform,
  useAdjustmentManagerSelector,
} from '../../../types';
import { AdjustmentManager } from '../../../adjustment-manager';
import styles from './resize.module.scss';
import { useEffect, useState } from 'react';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { ComponentChildStyle } from '../../../constants';
import { useSelector } from 'react-redux';
import { allSides } from './helpers';
import { ResizeHandler } from './resizeHandler';
import { ResizeData } from './types';

export const Resize = () => {
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

  const itemComponentData = useSelector(
    propManager.getComponentPropChangeSelector(
      selectedItemId ?? '',
      ComponentChildStyle
    )
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
  }, [selectedItemId, selectedItemRef, itemComponentData, draggingItemId]);

  if (!itemRect || !selectedItemId) return null;

  const handleTransformChange = (resizeData: ResizeData) => {
    propManager.deepAssignComponentProp<IChildComponentTransform>(
      selectedItemId,
      ComponentChildStyle,
      {
        style: {
          width: resizeData.width,
          height: resizeData.height,
        },
      }
    );
  };

  return (
    <div
      className={styles.root}
      style={{
        width: itemRect.width,
        height: itemRect.height,
        left: itemRect.left,
        top: itemRect.top,
      }}
    >
      {allSides.map((side) => {
        return (
          <ResizeHandler
            key={side}
            side={side}
            itemRef={selectedItemRef}
            onTransformChange={handleTransformChange}
          />
        );
      })}
    </div>
  );
};
