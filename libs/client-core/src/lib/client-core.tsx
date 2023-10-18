import styles from './client-core.module.scss';
import { useSelector } from 'react-redux';

/* eslint-disable-next-line */
export interface ClientCoreProps {}

export function ClientCore(props: ClientCoreProps) {
  const width = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.BreakpointManager.editor.width
    // TODO Fix type issue
  );

  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientCore! {width}</h1>
    </div>
  );
}

export default ClientCore;
