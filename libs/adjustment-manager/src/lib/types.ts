export const AdjustmentManagerService = 'AdjustmentManager';

export interface IStoreRootState {
  [AdjustmentManagerService]: IAdjustmentManagerSlice;
  [key: string]: unknown;
}

export interface IAdjustmentManagerSlice {
  hoveredContainerId?: string | null;
  mouseOverItemId?: string | null;
  selectedItemId?: string | null;
  draggingItemId?: string | null;
}

export interface IAdjustmentManagerActions {
  addItemRootRef(
    itemId: string,
    rootRef: React.RefObject<HTMLDivElement>
  ): void;
  setHoveredContainerId(itemId: string | null): void;
  getHoveredContainerId(): string | null | undefined;
  setMouseOverItemId(itemId: string | null): void;
  getMouseOverItemId(): string | null | undefined;
  setSelectedItemId(itemId: string | null): void;
  getSelectedItemId(): string | null | undefined;
  setDraggingItemId(itemId: string | null): void;
  getDraggingItemId(): string | null | undefined;
}
