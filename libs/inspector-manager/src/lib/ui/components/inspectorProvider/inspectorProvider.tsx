import styles from './inspectorProvider.module.scss';
import { useState } from 'react';
import { InspectorProviderDialog } from './inspectorProviderDialog/inspectorProviderDialog';

interface IInspectorProviderProps {
  itemId: string;
  propName: string;
}

export const InspectorProvider = ({
  itemId,
  propName,
}: IInspectorProviderProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.root} onClick={() => setOpen(true)}>
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
