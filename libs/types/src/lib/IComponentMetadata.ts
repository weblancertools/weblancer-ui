import { ResizeSide } from './ResizeSide';

export interface IComponentMetadata {
  isContainer?: boolean;
  dragging?: IDraggingMetadata;
  resize?: IResizeMetadata;
}

export interface IDraggingMetadata {
  restrictedMovementAxises?: ('x' | 'y')[];
  childrenRestrictedMovementAxises?: ('x' | 'y')[];
}

export interface IResizeMetadata {
  restrictedResizeSides?: ResizeSide[];
  childrenRestrictedResizeSides?: ResizeSide[];
}
