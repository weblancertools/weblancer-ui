import styles from './client-core.module.scss';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import {
  IComponentData,
  IPropManagerActions,
  PropManager,
} from '@weblancer-ui/prop-manager';
import { ComponentRenderer } from './components/componentRenderer/componentRenderer';
import { useSelector } from 'react-redux';
import { memo, useEffect } from 'react';
import { PropTypes } from '@weblancer-ui/types';

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
          metadata: {
            isContainer: true,
          },
          props: {
            text: {
              large: {
                name: 'text',
                value: 'page1',
                typeInfo: { typeName: PropTypes.String },
              },
            },
          },
          children: ['text1', 'text2'],
        },
        text1: {
          id: 'text1',
          componentKey: 'weblancer-text',
          parentId: 'page1',
          // metadata: {
          //   restrictedMoveAxises: ['x'],
          // },
          props: {
            text: {
              large: {
                name: 'text',
                value: 'text13',
                typeInfo: { typeName: PropTypes.String },
              },
              medium: {
                name: 'text',
                value: 'text12',
                typeInfo: { typeName: PropTypes.String },
              },
              small: {
                name: 'text',
                value: 'text11',
                typeInfo: { typeName: PropTypes.String },
              },
            },
          },
        },
        text2: {
          id: 'text2',
          componentKey: 'weblancer-text',
          parentId: 'page1',
          // metadata: {
          //   restrictedMoveAxises: ['x'],
          // },
          props: {
            text: {
              large: {
                name: 'text',
                value: 'text2',
                typeInfo: { typeName: PropTypes.String },
              },
            },
          },
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
