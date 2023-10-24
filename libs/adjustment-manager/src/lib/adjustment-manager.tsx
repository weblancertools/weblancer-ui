import styles from './adjustment-manager.module.scss';

/* eslint-disable-next-line */
export interface AdjustmentManagerProps {}

export function AdjustmentManager(props: AdjustmentManagerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdjustmentManager!</h1>
    </div>
  );
}

export default AdjustmentManager;
