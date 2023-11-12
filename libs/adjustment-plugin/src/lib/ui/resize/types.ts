export interface IDelta {
  deltaX: number;
  deltaY: number;
}
export interface ITransform {
  width?: number;
  height?: number;
  left: number;
  top: number;
}

export type ResizeData = IDelta & ITransform;
