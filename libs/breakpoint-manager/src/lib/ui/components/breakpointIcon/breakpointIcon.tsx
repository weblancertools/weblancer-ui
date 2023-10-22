import { FunctionComponent, PropsWithChildren } from 'react';
import { IBreakpoint, IBreakpointManagerActions } from '../../../types';
import styles from './breakpointIcon.module.scss';
import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { BreakpointManager } from '../../../breakpoint-manager';
import classNames from 'classnames';

interface IBreakpointIconProps extends PropsWithChildren {
  breakpoint: IBreakpoint;
  selected?: boolean;
}

export const BreakpointIcon: FunctionComponent<IBreakpointIconProps> = ({
  children,
  breakpoint,
  selected,
}) => {
  const breakpointManager =
    useWeblancerEditorManager<IBreakpointManagerActions>(BreakpointManager);

  const handleOnClick = () => {
    breakpointManager.setCurrentBreakpoint(breakpoint.bottom);
  };

  return (
    <div
      onClick={handleOnClick}
      className={classNames(styles.root, selected && styles.selected)}
    >
      {children}
    </div>
  );
};
