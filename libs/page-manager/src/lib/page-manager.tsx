import styles from './page-manager.module.scss';

/* eslint-disable-next-line */
export interface PageManagerProps {}

export function PageManager(props: PageManagerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PageManager!</h1>
    </div>
  );
}

export default PageManager;
