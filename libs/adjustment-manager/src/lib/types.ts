export const AdjustmentManagerService = 'AdjustmentManager';

export interface IAdjustmentManagerActions {
  addItemRootRef(
    itemId: string,
    rootRef: React.RefObject<HTMLDivElement>
  ): void;
}
