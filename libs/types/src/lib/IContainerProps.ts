import { ReactNode } from 'react';
import { WeblancerComponentIdAttributeName } from './Constants';

export interface IContainerProps {
  children?: ReactNode;
  rootProps?: {
    ref: React.RefObject<HTMLDivElement>;
    className: string;
    style?: React.CSSProperties;
    [WeblancerComponentIdAttributeName]: string;
    onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
    onMouseOver: React.MouseEventHandler<HTMLDivElement>;
  };
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
}
