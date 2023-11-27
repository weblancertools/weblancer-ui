import styles from './inspectorProvider.module.scss';
import { useState } from 'react';
import { InspectorProviderDialog } from './inspectorProviderDialog/inspectorProviderDialog';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import {
  IPropProviderActions,
  PropProviderManager,
} from '@weblancer/prop-provider';
import classNames from 'classnames';

interface IInspectorProviderProps {
  itemId: string;
  propName: string;
}

export const InspectorProvider = ({
  itemId,
  propName,
}: IInspectorProviderProps) => {
  const [open, setOpen] = useState(false);
  const propProvider =
    useWeblancerManager<IPropProviderActions>(PropProviderManager);

  const providers = propProvider.getItemPropProviders(itemId, propName);
  return (
    <>
      <div
        className={classNames(
          styles.root,
          providers.length > 0 && styles.hasProvider
        )}
        onClick={() => setOpen(true)}
      >
        +
      </div>
      <InspectorProviderDialog
        open={open}
        itemId={itemId}
        propName={propName}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
