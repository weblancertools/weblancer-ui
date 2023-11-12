import styles from './client-core.module.scss';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { ComponentRenderer } from './components/componentRenderer/componentRenderer';
import { useSelector } from 'react-redux';
import { memo, useEffect } from 'react';
import { IComponentData } from '@weblancer-ui/types';

export function ClientCoreComponent() {
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);
  const pageComponentData: IComponentData = useSelector(
    propManager.getPageDataSelector()
  );

  useEffect(() => {
    propManager.setPageData(
      {
        page1: {
          id: 'page1',
          componentKey: 'weblancer-component-kit-page',
          parentId: 'none',
          props: {},
          children: [],
        },
      },
      'page1'
    );
  }, [propManager]);

  return (
    <div className={styles.root}>
      {pageComponentData?.id && (
        <ComponentRenderer itemId={pageComponentData.id} />
      )}
    </div>
  );
}

export const ClientCore = memo(ClientCoreComponent);
