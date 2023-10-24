export const AdjustmentManagerService = 'AdjustmentManager';

export interface IAdjustmentManagerActions {
  addItemRootRef(
    itemId: string,
    rootRef: React.RefObject<HTMLDivElement>
  ): void;
  setHoveredContainerId(itemId: string | null): void;
  getHoveredContainerId(): string | null;
  setMouseOverItemId(itemId: string | null): void;
  getMouseOverItemId(): string | null;
  setSelectedItemId(itemId: string | null): void;
  getSelectedItemId(): string | null;
  setDraggingItemId(itemId: string | null): void;
  getDraggingItemId(): string | null;
}
