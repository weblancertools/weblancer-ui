import styles from './layout-manager.module.scss';

/* eslint-disable-next-line */
export interface LayoutManagerProps {}

export function LayoutManager(props: LayoutManagerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LayoutManager!</h1>
    </div>
  );
}

export default LayoutManager;
