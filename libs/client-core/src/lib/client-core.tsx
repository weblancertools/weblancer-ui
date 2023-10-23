import styles from './client-core.module.scss';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import {
  IComponentData,
  IPropManagerActions,
  PropManager,
} from '@weblancer-ui/prop-manager';
import { ComponentRenderer } from './components/componentRenderer/componentRenderer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PropTypes } from '@weblancer-ui/types';

// TODO must handle loading page data
export function ClientCore() {
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);
  const pageComponentData: IComponentData = useSelector(
    propManager.getPageDataSelector()
  );

  useEffect(() => {
    propManager.setPageData({
      id: 'page1',
      componentKey: 'weblancer-text',
      parentId: 'none',
      props: {
        text: {
          large: {
            name: 'text',
            value: 'Behrooz',
            typeInfo: { typeName: PropTypes.String },
          },
        },
      },
    });
  }, [propManager]);

  return (
    <div className={styles['container']}>
      {/* // TODO return loading */}
      {pageComponentData.id && (
        <ComponentRenderer itemId={pageComponentData.id} />
      )}
    </div>
  );
}

export default ClientCore;
