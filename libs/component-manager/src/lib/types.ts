import { ComponentManagerService } from './constants';
import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';

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
}

export interface IComponentMap {
  [componentName: string]: IComponentHolder;
}

export interface IComponentHolder {
  key: string;
  label: string;
  group: string | string[];
  component: WeblancerComponent;
}

export type WeblancerComponent = React.ComponentType<IWeblancerComponentProps>;
