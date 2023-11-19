import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { ProviderKey, ProviderName, StateProvider } from './StateProvider';
import styles from './stateProviderComponent.module.scss';
import {
  IStateManagerActions,
  StateManager,
} from '@weblancer-ui/state-manager';
import {
  IProviderFactory,
  IProviderFactoryComponentProps,
  PropProviderManager,
} from '@weblancer/prop-provider';

export const StateProviderComponent = ({
  onClose,
  onProviderCreated,
}: IProviderFactoryComponentProps) => {
  const stateManager = useWeblancerManager<IStateManagerActions>(StateManager);

  const createProvider = (stateKey: string) => {
    onProviderCreated(StateProviderFactory, stateKey);
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>All States</div>
      <div className={styles.body}>
        {Object.values(stateManager.getAllStates()).map((stateData) => {
          return (
            <div
              key={stateData.key}
              className={styles.stateRow}
              onClick={() => createProvider(stateData.key)}
            >
              <div className={styles.stateTitle}>{stateData.key}</div>
              <div className={styles.stateType}>
                Type: {stateData.typeInfo.typeName}
              </div>
            </div>
          );
        })}
      </div>
      <button className={styles.back} onClick={onClose}>
        Back
      </button>
    </div>
  );
};

export const StateProviderFactory: IProviderFactory = {
  component: StateProviderComponent,
  key: ProviderKey,
  name: ProviderName,
  description: 'Provide prop from state manager',
  propProviderClass: StateProvider,
};

PropProviderManager.registerProviderFactory(StateProviderFactory);
