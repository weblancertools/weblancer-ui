import styles from './client-core.module.scss';
import { ComponentRenderer } from './components/componentRenderer/componentRenderer';
import { memo } from 'react';
// import { useLoadPage } from './hooks/useLoadPage';
import { useLoadPage2 } from './hooks/useLoadPage2';

export function ClientCoreComponent() {
  // const pageComponentData = useLoadPage();

  const { page, notFound, error } = useLoadPage2();

  if (notFound) return 'Not Found';

  if (error) return error;

  return (
    <div className={styles.root}>
      {page?.id && <ComponentRenderer itemId={page.id} />}
    </div>
  );
}

export const ClientCore = memo(ClientCoreComponent);
