import { useEffect, useRef } from 'react';
import styles from './weblancerComponentRoot.module.scss';
import {
  useWeblancerClientContext,
  useWeblancerManager,
} from '@weblancer-ui/editor-core';
import { AdjustmentManager } from '../../adjustment-manager';
import {
  IAdjustmentManagerActions,
  IChildComponentTransform,
} from '../../types';
import {
  IComponentData,
  IWeblancerComponentProps,
} from '@weblancer-ui/prop-manager';
import Draggable, { DraggableCore } from 'react-draggable';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useMouseEventsHandler } from './hooks/useMouseEventsHandler';
import { WeblancerComponentIdAttributeName } from '@weblancer-ui/types';
import classNames from 'classnames';
import { ComponentChildStyle } from '../../constants';
import { useFrame } from 'react-frame-component';

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
  const { document } = useWeblancerClientContext();
  const rootRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable>(null);
  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  useEffect(() => {
    adjustmentManager.addItemRootRef(itemId, rootRef);
  }, [adjustmentManager, itemId]);

  const isContainer = componentData.metadata?.isContainer;
  const parentId = componentData.parentId;

  const childComponentTransform = defineProp<IChildComponentTransform>({
    name: ComponentChildStyle,
    typeInfo: {
      typeName: ComponentChildStyle,
    },
  });

  const { draggableProps } = useDragAndDrop(itemId, parentId, {
    childComponentTransform,
  });

  const { mouseEventProps } = useMouseEventsHandler(itemId, {
    isContainer,
  });
  return (
    <DraggableCore
      ref={draggableRef}
      nodeRef={rootRef}
      offsetParent={document?.body}
      {...draggableProps}
    >
      <div
        ref={rootRef}
        className={classNames(
          styles.root,
          isContainer && styles.container,
          styles.child
        )}
        {...{ [WeblancerComponentIdAttributeName]: itemId }}
        {...mouseEventProps}
        style={childComponentTransform?.style}
      >
        {children}
      </div>
    </DraggableCore>
  );
};
