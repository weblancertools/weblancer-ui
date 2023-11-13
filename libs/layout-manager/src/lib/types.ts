import { DrawerState, IComponentData, IPosition } from '@weblancer-ui/types';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const LayoutManagerService = 'LayoutManager';

export interface ILayoutManagerSlice {
  state: DrawerState;
}

export interface IStoreRootState {
  [LayoutManagerService]: ILayoutManagerSlice;
  [key: string]: unknown;
}

export const useLayoutManagerSelector: TypedUseSelectorHook<IStoreRootState> =
  useSelector;

export interface ILayoutManagerActions {
  getLayout(): Omit<IComponentData, 'parentId'>;
  handleItemDrop(
    droppedItemId: string,
    newParentId: string,
    position: IPosition
  ): void;
  changeItemOrder(itemId: string, newIndex: number): void;
  setPositionInParent(
    itemId: string,
    data: IPosition & { node?: HTMLElement }
  ): void;
  setClientDocument(document?: Document): void;
  getClientDocument(): Document;
}
