import {
  AdjustmentManagerService,
  useAdjustmentManagerSelector,
} from '@weblancer-ui/adjustment-manager';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import styles from './inspectorDrawer.module.scss';
import { InspectorView } from '../components/inspectorView/inspectorView';
import { IEditorDrawerProps } from '@weblancer-ui/types';
import { InspectorProvider } from '../components/inspectorProvider/inspectorProvider';
import { IInspectorManagerActions } from '../../types';
import { InspectorManager } from '../../inspector-manager';
import { useSelector } from 'react-redux';

export const InspectorDrawer = ({ onClose }: IEditorDrawerProps) => {
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);
  const inspectorManager =
    useWeblancerManager<IInspectorManagerActions>(InspectorManager);

  const selectedItemId = useAdjustmentManagerSelector(
    (state) => state[AdjustmentManagerService].selectedItemId
  );

  useSelector(propManager.getComponentChangeSelector(selectedItemId ?? ''));

  if (!selectedItemId) return <div className={styles.root}></div>; // TODO return blank screen and a message ("select an item to show its inspectors")

  const componentData = propManager.getComponent(selectedItemId);
  const componentDataProps = componentData
    ? Object.keys(componentData.props)
    : [];

  const getFilteredProps = () => {
    return componentDataProps.filter((propName) => {
      const propData = propManager.getComponentProp(selectedItemId, propName);

      if (!propData.typeInfo) return false;

      const inspectorData = inspectorManager.getInspector(
        propData.typeInfo.typeName
      );

      return !!inspectorData;
    });
  };

  return (
    <div className={styles.root}>
      {getFilteredProps().map((propName) => {
        return (
          <div className={styles.row} key={propName}>
            <InspectorView itemId={selectedItemId} propName={propName} />
            <InspectorProvider itemId={selectedItemId} propName={propName} />
          </div>
        );
      })}
    </div>
  );
};
