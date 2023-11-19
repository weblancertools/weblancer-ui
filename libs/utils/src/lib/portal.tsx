/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps extends PropsWithChildren {
  nodeOrElementId?: Element | string;
}
export const Portal = ({ children, nodeOrElementId }: IPortalProps) => {
  const container = !nodeOrElementId
    ? document.body
    : typeof nodeOrElementId === 'string'
    ? document.getElementById(nodeOrElementId)
    : nodeOrElementId;

  return ReactDOM.createPortal(children, container!);
};
