import styles from './client-core.module.scss';
import { ComponentRenderer } from './components/componentRenderer/componentRenderer';
import { memo } from 'react';
import { useLoadPage } from './hooks/useLoadPage';

export function ClientCoreComponent() {
  const pageComponentData = useLoadPage();

  return (
    <div className={styles.root}>
      {pageComponentData?.id && (
        <ComponentRenderer itemId={pageComponentData.id} />
      )}
    </div>
  );
}

export const ClientCore = memo(ClientCoreComponent);
