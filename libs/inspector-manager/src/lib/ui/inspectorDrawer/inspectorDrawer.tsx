import {
  IInspectorManagerActions,
  InspectorManagerService,
  useInspectorManagerSelector,
} from '../../types';
import { IEditorDrawerProps } from '@weblancer-ui/types';
import { useEffect } from 'react';
import {
  AdjustmentManagerService,
  useAdjustmentManagerSelector,
} from '@weblancer-ui/adjustment-manager';
import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { InspectorManager } from '../../inspector-manager';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import styles from './inspectorDrawer.module.scss';
import { shallowEqual } from 'react-redux';

export const InspectorDrawer = ({
  isOpen,
  onOpen,
  onClose,
  onPined,
}: IEditorDrawerProps) => {
  const inspectorState = useInspectorManagerSelector(
    (state) => state[InspectorManagerService].state,
    shallowEqual
  );

  useEffect(() => {
    switch (inspectorState) {
      case 'open':
        onOpen(InspectorManagerService);
        break;
      case 'close':
        onClose(InspectorManagerService);
        break;
      case 'pined':
        onPined(InspectorManagerService);
        break;
    }
  }, [inspectorState, onOpen, onClose, onPined]);

  const inspectorManager =
    useWeblancerEditorManager<IInspectorManagerActions>(InspectorManager);
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const selectedItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].selectedItemId
  );

  if (!selectedItemId) return <div className={styles.root}></div>; // TODO return blank screen and a message ("select an item to show its inspectors")

  const componentData = propManager.getComponent(selectedItemId);

  const inspectors = Object.keys(componentData.props).map((propName) => {
    const propData = propManager.getComponentProp(selectedItemId, propName);

    const inspectorData = inspectorManager.getInspector(
      propData.typeInfo.typeName
    );

    if (!inspectorData) return null;

    const InspectorView = inspectorData.node;

    return (
      <InspectorView
        itemId={selectedItemId}
        key={propData.name}
        propName={propData.name}
      />
    );
  });

  return <div className={styles.root}>{inspectors}</div>;
};
