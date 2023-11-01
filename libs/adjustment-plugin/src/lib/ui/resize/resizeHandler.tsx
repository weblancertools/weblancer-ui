/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ResizeSide } from '@weblancer-ui/types';
import styles from './resize.module.scss';
import classNames from 'classnames';
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import { ResizeData } from './types';
import { getResizeData } from './helpers';
import { useRef } from 'react';

interface IResizeHandlerProps {
  itemRef: React.RefObject<HTMLDivElement>;
  rootRef: React.RefObject<HTMLDivElement>;
  side: ResizeSide;
  onTransformChange(resizeData: ResizeData): void;
  onResizingStart(): void;
  onResizingStop(): void;
}

export const ResizeHandler = ({
  itemRef,
  rootRef,
  side,
  onTransformChange,
  onResizingStart,
  onResizingStop,
}: IResizeHandlerProps) => {
  const currentResizeData = useRef<ResizeData>();
  const nodeRef = useRef<HTMLDivElement>(null);
  const clone = useRef<HTMLElement>();
  const firstSkipped = useRef(false);

  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    if (!itemRef.current) return false;

    const itemRect = itemRef.current.getBoundingClientRect();

    currentResizeData.current = {
      height: itemRect.height,
      left: itemRect.left,
      top: itemRect.top,
      width: itemRect.width,
      deltaX: 0,
      deltaY: 0,
    };

    clone.current?.remove();

    clone.current = rootRef.current!.cloneNode(true) as HTMLElement;
    const rootRect = rootRef.current!.getBoundingClientRect();

    clone.current.style.position = 'absolute';
    clone.current.style.pointerEvents = 'none';
    clone.current.style.visibility = 'hidden';
    clone.current.style.left = `${rootRect.left}px`;
    clone.current.style.top = `${rootRect.top}px`;

    document.body.appendChild(clone.current);

    firstSkipped.current = false;
    onResizingStart();
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    // The first drag data is incorrect by unknown reason
    if (!firstSkipped.current) {
      firstSkipped.current = true;
      return;
    }

    currentResizeData.current = getResizeData(
      currentResizeData.current!,
      side,
      {
        deltaX: data.deltaX,
        deltaY: data.deltaY,
      }
    );

    onTransformChange(currentResizeData.current);
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    onResizingStop();
  };

  return (
    <DraggableCore
      nodeRef={nodeRef}
      onDrag={handleDrag}
      onStart={handleStart}
      onStop={handleStop}
      offsetParent={clone.current}
    >
      <div
        ref={nodeRef}
        className={classNames(styles.circle, styles[side])}
      ></div>
    </DraggableCore>
  );
};
