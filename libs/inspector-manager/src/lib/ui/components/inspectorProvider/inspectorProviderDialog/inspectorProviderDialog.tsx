/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import styles from './inspectorProviderDialog.module.scss';
import {
  AddProviderAction,
  IPropProviderActions,
  IProviderFactory,
  PropProviderManager,
  RemoveProviderAction,
} from '@weblancer/prop-provider';
import { useState } from 'react';
import { EditorAction } from '@weblancer-ui/undo-manager';

interface IInspectorProviderDialogProps {
  itemId: string;
  propName: string;
  open?: boolean;
  onClose(): void;
}

export const InspectorProviderDialog = ({
  open,
  itemId,
  propName,
  onClose,
}: IInspectorProviderDialogProps) => {
  const [openProvider, setOpenProvider] = useState<IProviderFactory>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, refresh] = useState({});

  const propProvider =
    useWeblancerManager<IPropProviderActions>(PropProviderManager);

  if (!open) return null;

  const providers = propProvider.getItemPropProviders(itemId, propName);

  const allProviderFactories = propProvider.getProviderFactories();

  const handleFactoryClick = (factory: IProviderFactory) => {
    setOpenProvider(factory);
  };

  const handleRemoveProvider = (providerId: string) => {
    const providerKey = propProvider
      .getItemPropProviders(itemId, propName)
      .find((provider) => provider.id === providerId)!.key;

    const factory = propProvider.getProviderFactories()[providerKey];

    EditorAction.createAction(RemoveProviderAction)
      .prepare(itemId, propName, providerId, factory.propProviderClass)
      .perform();

    refresh({});
  };

  const handleProviderCreated = (factory: IProviderFactory, data: unknown) => {
    EditorAction.createAction(AddProviderAction)
      .prepare(itemId, propName, factory.propProviderClass, factory.key, data)
      .perform();

    onClose();
    setOpenProvider(undefined);
  };

  const FactoryComponent = openProvider?.component;

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>All Providers</div>
        <div className={styles.providers}>
          {providers.map((provider) => {
            return (
              <div className={styles.providerRow}>
                <div className={styles.providerDetail}>
                  <div className={styles.providerTitle}>{provider.name}</div>
                  <div className={styles.providerDesc}>
                    {provider.description}
                  </div>
                </div>
                <div
                  className={styles.providerDelete}
                  onClick={() => handleRemoveProvider(provider.id)}
                >
                  x
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.factories}>
          {Object.values(allProviderFactories).map((providerFactory) => {
            return (
              <div
                key={providerFactory.key}
                className={styles.factory}
                onClick={() => handleFactoryClick(providerFactory)}
              >
                {providerFactory.name}
              </div>
            );
          })}
        </div>
      </div>
      {FactoryComponent && (
        <FactoryComponent
          onClose={() => setOpenProvider(undefined)}
          onProviderCreated={handleProviderCreated}
        />
      )}
    </>
  );
};
