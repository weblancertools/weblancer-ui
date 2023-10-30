import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { IInspectorManagerActions } from '../../../types';
import { InspectorManager } from '../../../inspector-manager';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import styles from './inspectorView.module.scss';

interface IInspectorViewProps {
  itemId: string;
  propName: string;
}

export const InspectorView = ({ itemId, propName }: IInspectorViewProps) => {
  const inspectorManager =
    useWeblancerEditorManager<IInspectorManagerActions>(InspectorManager);
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const propData = propManager.getComponentProp(itemId, propName);
  const inspectorData = inspectorManager.getInspector(
    propData.typeInfo.typeName
  );

  if (!inspectorData) return null;

  const InspectorComponent = inspectorData.node;

  return (
    <div className={styles.root}>
      <span className={styles.title}>{propName}</span>
      <InspectorComponent itemId={itemId} propName={propData.name} />
    </div>
  );
};
