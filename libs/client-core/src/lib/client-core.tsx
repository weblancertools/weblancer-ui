import { useBreakpointManagerSelector } from '@weblancer-ui/breakpoint-manager';
import styles from './client-core.module.scss';

/* eslint-disable-next-line */
export interface ClientCoreProps {}

export function ClientCore(props: ClientCoreProps) {
  const width = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.editor.width
  );

  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientCore! {width}</h1>
    </div>
  );
}

export default ClientCore;
