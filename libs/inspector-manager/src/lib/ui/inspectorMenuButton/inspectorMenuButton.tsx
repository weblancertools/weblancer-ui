import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import styles from './inspectorMenuButton.module.scss';
import { InspectorManager } from '../../inspector-manager';
import {
  IInspectorManagerActions,
  IStoreRootState,
  InspectorManagerService,
} from '../../types';
import { useSelector } from 'react-redux';

export const InspectorMenuButton = () => {
  const inspectorManager =
    useWeblancerEditorManager<IInspectorManagerActions>(InspectorManager);

  const inspectorState = useSelector(
    (state: IStoreRootState) => state[InspectorManagerService].state
  );

  const handleClick = () => {
    switch (inspectorState) {
      case 'close':
        inspectorManager.setInspectorState('open');
        break;
      case 'open':
      case 'pined':
        inspectorManager.setInspectorState('close');
        break;
    }
  };

  return (
    <div className={styles.root} onClick={handleClick}>
      Ins
    </div>
  );
};
