import { ResizeSide } from '@weblancer-ui/types';
import { IDelta, ITransform, ResizeData } from './types';

export function getResizeData(
  currentTransform: ITransform,
  side: ResizeSide,
  delta: IDelta
) {
  const resizeData: ResizeData = {
    ...currentTransform,
    ...delta,
  };

  switch (side) {
    case ResizeSide.N:
      resizeData.top += delta.deltaY;
      resizeData.height -= delta.deltaY;
      break;
    case ResizeSide.NE:
      resizeData.top += delta.deltaY;
      resizeData.height -= delta.deltaY;
      resizeData.width += delta.deltaX;
      break;
    case ResizeSide.E:
      resizeData.width += delta.deltaX;
      break;
    case ResizeSide.SE:
      resizeData.width += delta.deltaX;
      resizeData.height += delta.deltaY;
      break;
    case ResizeSide.S:
      resizeData.height += delta.deltaY;
      break;
    case ResizeSide.SW:
      resizeData.height += delta.deltaY;
      resizeData.left += delta.deltaX;
      resizeData.width -= delta.deltaX;
      break;
    case ResizeSide.W:
      resizeData.left += delta.deltaX;
      resizeData.width -= delta.deltaX;
      break;
    case ResizeSide.NW:
      resizeData.left += delta.deltaX;
      resizeData.width -= delta.deltaX;
      resizeData.top += delta.deltaY;
      resizeData.height -= delta.deltaY;
      break;
  }

  return resizeData;
}

export const allSides = [
  ResizeSide.E,
  ResizeSide.N,
  ResizeSide.NE,
  ResizeSide.NW,
  ResizeSide.S,
  ResizeSide.SE,
  ResizeSide.SW,
  ResizeSide.W,
];
