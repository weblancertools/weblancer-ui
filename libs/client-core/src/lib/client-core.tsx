import styles from './client-core.module.scss';

/* eslint-disable-next-line */
export interface ClientCoreProps {}

export function ClientCore(props: ClientCoreProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientCore!</h1>
    </div>
  );
}

export default ClientCore;
