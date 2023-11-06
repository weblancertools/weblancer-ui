import { useEffect, useRef } from 'react';
import styles from './weblancerComponentRoot.module.scss';
import {
  useWeblancerClientContext,
  useWeblancerManager,
} from '@weblancer-ui/editor-core';
import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import Draggable, { DraggableCore } from 'react-draggable';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useMouseEventsHandler } from './hooks/useMouseEventsHandler';
import { WeblancerComponentIdAttributeName } from '@weblancer-ui/types';
import classNames from 'classnames';
import {
  AdjustmentManager,
  ComponentChildStyle,
  IAdjustmentManagerActions,
  IChildComponentTransform,
} from '@weblancer-ui/adjustment-manager';
import {
  ComponentManager,
  IComponentManagerActions,
} from '@weblancer-ui/component-manager';

export interface IWeblancerComponentRootProps extends IWeblancerComponentProps {
  itemId: string;
}

export const WeblancerComponentRoot = ({
  itemId,
  defineProp,
  children,
}: IWeblancerComponentRootProps) => {
  const { document } = useWeblancerClientContext();
  const rootRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable>(null);
  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);
  const componentManager =
    useWeblancerManager<IComponentManagerActions>(ComponentManager);

  useEffect(() => {
    adjustmentManager.addItemRootRef(itemId, rootRef);
  }, [adjustmentManager, itemId]);

  const isContainer = componentManager.getMetadata(itemId)?.isContainer;

  const childComponentTransform = defineProp<IChildComponentTransform>({
    name: ComponentChildStyle,
    typeInfo: {
      typeName: ComponentChildStyle,
    },
  });

  const { draggableProps } = useDragAndDrop(itemId);

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
