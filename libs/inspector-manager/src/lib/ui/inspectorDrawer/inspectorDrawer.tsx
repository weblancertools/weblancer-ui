import {
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
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import styles from './inspectorDrawer.module.scss';
import { shallowEqual } from 'react-redux';
import { InspectorView } from '../components/inspectorView/inspectorView';

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

  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const selectedItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].selectedItemId
  );

  if (!selectedItemId) return <div className={styles.root}></div>; // TODO return blank screen and a message ("select an item to show its inspectors")

  const componentData = propManager.getComponent(selectedItemId);
  const componentDataProps = Object.keys(componentData.props);

  return (
    <div className={styles.root}>
      {componentDataProps.map((propName) => {
        return (
          <InspectorView
            key={propName}
            itemId={selectedItemId}
            propName={propName}
          />
        );
      })}
    </div>
  );
};
