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
  getItemRootRef(itemId: string): React.RefObject<HTMLDivElement>;
  setHoveredContainerId(itemId: string | null): void;
  getHoveredContainerId(): string | null | undefined;
  setMouseOverItemId(itemId: string | null): void;
  getMouseOverItemId(): string | null | undefined;
  setSelectedItemId(itemId: string | null): void;
  getSelectedItemId(): string | null | undefined;
  setDraggingItemId(itemId: string | null): void;
  getDraggingItemId(): string | null | undefined;
}

export interface IChildComponentTransform {
  style?: React.CSSProperties;
  transform: {
    gridArea: {
      startRow: number;
      endRow: number;
      startColumn: number;
      endColumn: number;
    };
    docking: {
      autoDocking?: boolean;
      dockingState: {
        top?: boolean;
        right?: boolean;
        bottom?: boolean;
        left?: boolean;
      };
      margins: {
        top?: IAdjustmentValue<'px' | '%'>;
        right?: IAdjustmentValue<'px' | '%'>;
        bottom?: IAdjustmentValue<'px' | '%'>;
        left?: IAdjustmentValue<'px' | '%'>;
      };
    };
  };
}

export interface IAdjustmentValue<TUnit> {
  unit: TUnit;
  value: number | string;
  options?: string[];
}
