import { ComponentManagerService } from './constants';
import {
  IComponentData,
  IWeblancerComponentProps,
} from '@weblancer-ui/prop-manager';

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
  ): void;
  deleteItem(itemId: string): void;
}

export interface IComponentMap {
  [componentName: string]: IComponentHolder;
}

export interface IComponentHolder {
  key: string;
  component: WeblancerComponent;
  metadata?: IComponentRegisterMetadata;
}

export type WeblancerComponent = React.ComponentType<IWeblancerComponentProps>;

export interface IComponentRegisterMetadata {
  label?: string;
  categories?: string | string[];
  groups?: string | string[];
  defaultComponentData?: Partial<
    Pick<IComponentData, 'props' | 'childrenPropData' | 'metadata'>
  >;
}
