import styles from './component-manager.module.scss';

/* eslint-disable-next-line */
export interface ComponentManagerProps {}

export function ComponentManager(props: ComponentManagerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ComponentManager!</h1>
    </div>
  );
}

export default ComponentManager;
