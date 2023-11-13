import {
  AdjustmentManagerService,
  useAdjustmentManagerSelector,
} from '@weblancer-ui/adjustment-manager';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import styles from './inspectorDrawer.module.scss';
import { InspectorView } from '../components/inspectorView/inspectorView';
import { IEditorDrawerProps } from '@weblancer-ui/types';

export const InspectorDrawer = ({ onClose }: IEditorDrawerProps) => {
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);

  const selectedItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].selectedItemId
  );

  if (!selectedItemId) return <div className={styles.root}></div>; // TODO return blank screen and a message ("select an item to show its inspectors")

  const componentData = propManager.getComponent(selectedItemId);
  const componentDataProps = componentData
    ? Object.keys(componentData.props)
    : [];

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
