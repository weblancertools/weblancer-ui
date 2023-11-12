import { IComponentMetadata, ResizeSide } from '@weblancer-ui/types';
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
      resizeData.height = (resizeData.height ?? 0) - delta.deltaY;
      break;
    case ResizeSide.NE:
      resizeData.top += delta.deltaY;
      resizeData.height = (resizeData.height ?? 0) - delta.deltaY;
      resizeData.width = (resizeData.width ?? 0) + delta.deltaX;
      break;
    case ResizeSide.E:
      resizeData.width = (resizeData.width ?? 0) + delta.deltaX;
      break;
    case ResizeSide.SE:
      resizeData.width = (resizeData.width ?? 0) + delta.deltaX;
      resizeData.height = (resizeData.height ?? 0) + delta.deltaY;
      break;
    case ResizeSide.S:
      resizeData.height = (resizeData.height ?? 0) + delta.deltaY;
      break;
    case ResizeSide.SW:
      resizeData.height = (resizeData.height ?? 0) + delta.deltaY;
      resizeData.left += delta.deltaX;
      resizeData.width = (resizeData.width ?? 0) - delta.deltaX;
      break;
    case ResizeSide.W:
      resizeData.left += delta.deltaX;
      resizeData.width = (resizeData.width ?? 0) - delta.deltaX;
      break;
    case ResizeSide.NW:
      resizeData.left += delta.deltaX;
      resizeData.width = (resizeData.width ?? 0) - delta.deltaX;
      resizeData.top += delta.deltaY;
      resizeData.height = (resizeData.height ?? 0) - delta.deltaY;
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

export function isRestrictedSide(
  side: ResizeSide,
  metadata?: IComponentMetadata,
  parentMetaData?: IComponentMetadata
) {
  if (metadata?.resize?.restrictedResizeSides) {
    if (metadata.resize.restrictedResizeSides.includes(side)) return true;
  }

  if (parentMetaData?.resize?.childrenRestrictedResizeSides) {
    if (parentMetaData.resize.childrenRestrictedResizeSides.includes(side))
      return true;
  }

  return false;
}

export function isRestrictedForPositioning(
  parentMetaData?: IComponentMetadata
) {
  return parentMetaData?.resize?.restrictedChildrenPositioning;
}
