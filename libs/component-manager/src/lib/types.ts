import {
  IComponentHolder,
  IComponentMap,
  IComponentMetadata,
  WeblancerComponent,
} from '@weblancer-ui/types';
import { ComponentManagerService } from './constants';

export interface IStoreRootState {
  [ComponentManagerService]: IComponentManagerSlice;
  [key: string]: unknown;
}

export interface IComponentManagerSlice {
  test?: string;
}

export interface IComponentManagerActions {
  getAllComponents(): IComponentMap;
  getComponentByKey(key: string): WeblancerComponent;
  getComponentHolderByKey(key: string): IComponentHolder;
  createItem(
    componentKey: string,
    parentId: string,
    position: { x: number; y: number },
    forceItemId?: string,
    onItemCreated?: (itemId: string) => void
  ): string;
  deleteItem(itemId: string): void;
  getMetadata(itemId: string): IComponentMetadata | undefined;
}
