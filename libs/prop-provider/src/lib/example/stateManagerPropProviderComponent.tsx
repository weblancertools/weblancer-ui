import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IProviderFactory, IProviderFactoryComponentProps } from '../types';
import {
  ProviderKey,
  ProviderName,
  StateManagerPropProvider,
} from './StateManagerPropProvider';
import styles from './stateManagerPropProviderComponent.module.scss';
import {
  IStateManagerActions,
  StateManager,
} from '@weblancer-ui/state-manager';

export const StateManagerPropProviderComponent = ({
  onClose,
  onProviderCreated,
}: IProviderFactoryComponentProps) => {
  const stateManager = useWeblancerManager<IStateManagerActions>(StateManager);

  const createProvider = (stateKey: string) => {
    onProviderCreated(StateManagerPropProviderFactory, stateKey);
  };

  return (
    <div className={styles.root}>
      {Object.values(stateManager.getAllStates()).map((stateData) => {
        return (
          <div
            className={styles.stateRow}
            onClick={() => createProvider(stateData.key)}
          >
            <div className={styles.stateTitle}>{stateData.key}</div>
            <div className={styles.stateType}>
              {stateData.typeInfo.typeName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const StateManagerPropProviderFactory: IProviderFactory = {
  component: StateManagerPropProviderComponent,
  key: ProviderKey,
  name: ProviderName,
  propProviderClass: StateManagerPropProvider,
};
