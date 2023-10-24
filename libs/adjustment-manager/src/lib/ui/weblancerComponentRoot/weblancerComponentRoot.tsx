import { useEffect, useRef } from 'react';
import styles from './weblancerComponentRoot.module.scss';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { AdjustmentManager } from '../../adjustment-manager';
import { IAdjustmentManagerActions } from '../../types';
import {
  IComponentData,
  IWeblancerComponentProps,
} from '@weblancer-ui/prop-manager';
import Draggable from 'react-draggable';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useMouseEventsHandler } from './hooks/useMouseEventsHandler';
import { WeblancerComponentIdAttributeName } from '@weblancer-ui/types';

export interface IWeblancerComponentRootProps extends IWeblancerComponentProps {
  itemId: string;
  componentData: IComponentData;
}

export const WeblancerComponentRoot = ({
  itemId,
  componentData,
  defineProp,
  children,
}: IWeblancerComponentRootProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  useEffect(() => {
    adjustmentManager.addItemRootRef(itemId, rootRef);
  }, [adjustmentManager, itemId]);

  const { draggableProps } = useDragAndDrop(itemId);
  const { mouseEventProps } = useMouseEventsHandler(
    itemId,
    componentData.metadata?.isContainer
  );

  return (
    <Draggable nodeRef={rootRef} {...draggableProps}>
      <div
        ref={rootRef}
        className={styles.root}
        {...{ [WeblancerComponentIdAttributeName]: itemId }}
        {...mouseEventProps}
      >
        {children}
      </div>
    </Draggable>
  );
};
