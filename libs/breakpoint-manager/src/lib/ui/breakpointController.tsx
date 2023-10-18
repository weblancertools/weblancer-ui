import { FunctionComponent } from 'react';
import styles from './breakpointController.module.scss';
import { getSortedBreakpoints } from '../helpers';
import { BreakpointIcon } from './components/breakpointIcon/breakpointIcon';
import { getBreakpointIcon } from './helpers';
import { useBreakpointManagerSelector } from '../types';

export const BreakpointController: FunctionComponent = () => {
  const breakpoints = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.breakpoints
  );
  const sortedBreakpoints = getSortedBreakpoints(breakpoints);
  const currentBreakpoint = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.currentBreakpoint
  );
  const width = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.editor.width
  );

  return (
    <div className={styles.root}>
      <div className={styles.breakpointsRoot}>
        {sortedBreakpoints.map((breakpoint) => {
          return (
            <BreakpointIcon
              key={breakpoint.id}
              breakpoint={breakpoint}
              selected={currentBreakpoint.id === breakpoint.id}
            >
              <img
                className={styles.icon}
                src={getBreakpointIcon(breakpoint)}
                alt={breakpoint.id}
              />
            </BreakpointIcon>
          );
        })}
      </div>
      <div className={styles.widthInput}>
        {/* TODO show width on breakpoint slice */}
        {width}
      </div>
    </div>
  );
};
