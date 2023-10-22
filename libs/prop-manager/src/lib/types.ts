import { ITypeInfo } from '@weblancer-ui/types';
import { PropManagerService } from './constants';

export interface IStoreRootState {
  [PropManagerService]: IPropManagerSlice;
  [key: string]: unknown;
}

export interface IPropManagerSlice {
  pageData: Omit<IComponentData, 'parentId'>;
  componentMap: Record<string, IComponentData>;
}

export interface IPropManagerActions {
  addComponent(componentData: IComponentData): void;
  removeComponent(id: string): void;
  defineComponentProp(id: string, propData: IPropData): void;
  updateComponentProp(id: string, name: string, value: unknown): void;
  getComponent(id: string): IComponentData;
}

export interface IComponentData {
  id: string;
  name?: string;
  parentId: string;
  component: 'string';
  props: Record<string, IPropData>;
  childrenPropData?: Record<string, IComponentData>;
}

export interface IPropData {
  name: string;
  value?: unknown;
  typeInfo: ITypeInfo;
}
