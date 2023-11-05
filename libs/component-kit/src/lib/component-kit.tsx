import styles from './component-kit.module.scss';

/* eslint-disable-next-line */
export interface ComponentKitProps {}

export function ComponentKit(props: ComponentKitProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ComponentKit!</h1>
    </div>
  );
}

export default ComponentKit;
