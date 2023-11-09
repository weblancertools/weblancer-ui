import {
  IComponentData,
  IComponentMetadata,
  IContainerProps,
  IWeblancerComponentProps,
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
  ): void;
  deleteItem(itemId: string): void;
  getMetadata(itemId: string): IComponentMetadata | undefined;
}

export interface IComponentMap {
  [componentName: string]: IComponentHolder;
}

export interface IComponentHolder {
  key: string;
  component: WeblancerComponent;
  metadata?: IComponentRegisterMetadata;
}

export type WeblancerComponent =
  | React.ComponentType<IWeblancerComponentProps>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ComponentType<IWeblancerComponentProps & any>
  | React.ComponentType<IWeblancerComponentProps & IContainerProps>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ComponentType<IWeblancerComponentProps & IContainerProps & any>;

export interface IComponentRegisterMetadata {
  label?: string;
  categories?: string | string[];
  groups?: string | string[];
  componentMetadata?: IComponentMetadata;
  defaultComponentData?: Partial<Pick<IComponentData, 'props' | 'children'>>;
}
