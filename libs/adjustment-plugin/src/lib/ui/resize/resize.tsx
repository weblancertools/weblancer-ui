import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import styles from './resize.module.scss';
import { useEffect, useRef, useState } from 'react';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { useSelector } from 'react-redux';
import { allSides } from './helpers';
import { ResizeHandler } from './resizeHandler';
import { ResizeData } from './types';
import {
  AdjustmentManager,
  AdjustmentManagerService,
  ComponentChildStyle,
  IAdjustmentManagerActions,
  IChildComponentTransform,
  useAdjustmentManagerSelector,
} from '@weblancer-ui/adjustment-manager';
import {
  ILayoutManagerActions,
  LayoutManager,
} from '@weblancer-ui/layout-manager';
import classNames from 'classnames';

export const Resize = () => {
  const [resizing, setResizing] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const adjustmentManager =
    useWeblancerEditorManager<IAdjustmentManagerActions>(AdjustmentManager);
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);
  const layoutManager =
    useWeblancerEditorManager<ILayoutManagerActions>(LayoutManager);

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
  }, [selectedItemId, selectedItemRef, draggingItemId, componentData]);

  if (!itemRect || !selectedItemId) return null;

  const handleTransformChange = (resizeData: ResizeData) => {
    // console.log(JSON.stringify(resizeData));
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

    layoutManager.setPositionInParent(selectedItemId, {
      x: resizeData.left,
      y: resizeData.top,
    });
  };

  return (
    <>
      <div className={classNames(resizing && styles.interacting)}></div>
      <div
        ref={rootRef}
        className={classNames(styles.root)}
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
              rootRef={rootRef}
              onResizingStart={() => setResizing(true)}
              onResizingStop={() => setResizing(false)}
              onTransformChange={handleTransformChange}
            />
          );
        })}
      </div>
    </>
  );
};
