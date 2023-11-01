import { ResizeSide } from '@weblancer-ui/types';
import styles from './resize.module.scss';
import classNames from 'classnames';
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import { ResizeData } from './types';
import { getResizeData } from './helpers';
import { useRef } from 'react';

interface IResizeHandlerProps {
  itemRef: React.RefObject<HTMLDivElement>;
  side: ResizeSide;
  onTransformChange(resizeData: ResizeData): void;
}

export const ResizeHandler = ({
  itemRef,
  side,
  onTransformChange,
}: IResizeHandlerProps) => {
  const currentResizeData = useRef<ResizeData>();

  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    if (!itemRef.current) return false;

    const itemRect = itemRef.current.getBoundingClientRect();

    currentResizeData.current = {
      ...itemRect,
      deltaX: 0,
      deltaY: 0,
    };
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    currentResizeData.current = getResizeData(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      currentResizeData.current!,
      side,
      {
        ...data,
      }
    );

    onTransformChange(currentResizeData.current);
  };

  return (
    <DraggableCore onDrag={handleDrag} onStart={handleStart}>
      <div className={classNames(styles.circle, styles[side])}></div>
    </DraggableCore>
  );
};
