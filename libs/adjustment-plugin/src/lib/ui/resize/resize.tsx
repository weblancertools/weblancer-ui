import styles from './resize.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
  IPropManagerActions,
  PropManager,
  UpdateComponentPropAction,
} from '@weblancer-ui/prop-manager';
import { useSelector } from 'react-redux';
import {
  allSides,
  isRestrictedForPositioning,
  isRestrictedSide,
} from './helpers';
import { ResizeHandler } from './resizeHandler';
import { ResizeData } from './types';
import {
  AdjustmentManager,
  ComponentChildStyle,
  IAdjustmentManagerActions,
  IChildTransform,
  useAdjustmentVersion,
} from '@weblancer-ui/adjustment-manager';
import {
  ILayoutManagerActions,
  LayoutManager,
  SetPositionAction,
} from '@weblancer-ui/layout-manager';
import classNames from 'classnames';
import { BatchAction, EditorAction } from '@weblancer-ui/undo-manager';
import {
  ComponentManager,
  IComponentManagerActions,
} from '@weblancer-ui/component-manager';
import { IComponentData } from '@weblancer-ui/types';
import { useWeblancerManager } from '@weblancer-ui/editor-core';

export const Resize = () => {
  const [resizing, setResizing] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);
  const componentManager =
    useWeblancerManager<IComponentManagerActions>(ComponentManager);
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);
  const layoutManager =
    useWeblancerManager<ILayoutManagerActions>(LayoutManager);

  const { draggingItemId, selectedItemId, version } = useAdjustmentVersion();

  const componentData: IComponentData = useSelector(
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
  }, [selectedItemId, selectedItemRef, draggingItemId, componentData, version]);

  if (!itemRect || !selectedItemId) return null;

  const metadata = componentManager.getMetadata(selectedItemId);
  const parentMetadata = componentManager.getMetadata(componentData.parentId);

  const handleTransformChange = (resizeData: ResizeData) => {
    // No need to handle with undo manager nad actions while resizing
    propManager.deepAssignComponentProp<IChildTransform>(
      selectedItemId,
      ComponentChildStyle,
      {
        style: {
          width: resizeData.width,
          height: resizeData.height,
        },
      }
    );

    if (!isRestrictedForPositioning(parentMetadata)) {
      layoutManager.setPositionInParent(selectedItemId, {
        x: resizeData.left,
        y: resizeData.top,
      });
    }
  };

  const handleResizeStop = (
    lastResizeData: ResizeData,
    initialResizeData: ResizeData
  ) => {
    setResizing(false);

    const actions: EditorAction[] = [
      EditorAction.createAction(UpdateComponentPropAction).prepare(
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
      ),
    ];

    if (!isRestrictedForPositioning(parentMetadata)) {
      actions.push(
        EditorAction.createAction(SetPositionAction).prepare(
          selectedItemId,
          {
            x: lastResizeData.left,
            y: lastResizeData.top,
          },
          {
            x: initialResizeData.left,
            y: initialResizeData.top,
          }
        )
      );
    }

    BatchAction.batchPerform(actions);
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
            return !isRestrictedSide(side, metadata, parentMetadata);
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
