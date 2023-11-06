import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import styles from './resize.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
  IComponentData,
  IPropManagerActions,
  PropManager,
  UpdateComponentPropAction,
} from '@weblancer-ui/prop-manager';
import { useSelector } from 'react-redux';
import { allSides, isRestrictedSide } from './helpers';
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
  SetPositionAction,
} from '@weblancer-ui/layout-manager';
import classNames from 'classnames';
import { BatchAction, EditorAction } from '@weblancer-ui/undo-manager';

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

  const componentData: IComponentData = useSelector(
    propManager.getComponentChangeSelector(selectedItemId ?? '')
  );

  const parentComponentData: IComponentData = useSelector(
    propManager.getComponentChangeSelector(componentData.parentId)
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
    // No need to handle with undo manager nad actions while resizing
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

  const handleResizeStop = (
    lastResizeData: ResizeData,
    initialResizeData: ResizeData
  ) => {
    setResizing(false);

    const resizeAction = EditorAction.getActionInstance(
      UpdateComponentPropAction
    ).prepare(
      selectedItemId,
      ComponentChildStyle,
      {
        style: {
          width: lastResizeData.width,
          height: lastResizeData.height,
        },
      },
      {
        style: {
          width: initialResizeData.width,
          height: initialResizeData.height,
        },
      }
    );

    const positionAction = EditorAction.getActionInstance(
      SetPositionAction
    ).prepare(
      selectedItemId,
      {
        x: lastResizeData.left,
        y: lastResizeData.top,
      },
      {
        x: initialResizeData.left,
        y: initialResizeData.top,
      }
    );

    BatchAction.batchPerform([resizeAction, positionAction]);
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
        {allSides
          .filter((side) => {
            return isRestrictedSide(
              side,
              componentData.metadata,
              parentComponentData.metadata
            );
          })
          .map((side) => {
            return (
              <ResizeHandler
                key={side}
                side={side}
                itemRef={selectedItemRef}
                rootRef={rootRef}
                onResizingStart={() => setResizing(true)}
                onResizingStop={handleResizeStop}
                onTransformChange={handleTransformChange}
              />
            );
          })}
      </div>
    </>
  );
};
