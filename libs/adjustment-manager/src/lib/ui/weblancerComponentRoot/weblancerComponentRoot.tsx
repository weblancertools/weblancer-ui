import { useEffect, useRef, ReactNode } from 'react';
import styles from './weblancerComponentRoot.module.scss';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { AdjustmentManager } from '../../adjustment-manager';
import { IAdjustmentManagerActions } from '../../types';

export interface IWeblancerComponentRootProps {
  itemId: string;
  children?: ReactNode;
}

export const WeblancerComponentRoot = ({
  itemId,
  children,
}: IWeblancerComponentRootProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);

  useEffect(() => {
    adjustmentManager.addItemRootRef(itemId, rootRef);
  }, [adjustmentManager, itemId]);

  return (
    <div ref={rootRef} className={styles.root}>
      {children}
    </div>
  );
};
