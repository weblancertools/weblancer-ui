import styles from './local-context.module.scss';

/* eslint-disable-next-line */
export interface LocalContextProps {}

export function LocalContext(props: LocalContextProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LocalContext!</h1>
    </div>
  );
}

export default LocalContext;
