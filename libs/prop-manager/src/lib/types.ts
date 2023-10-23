import { ITypeInfo } from '@weblancer-ui/types';
import { PropManagerService } from './constants';
import { ReactNode } from 'react';

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
  defineProp<TPropType = unknown>(
    id: string,
    propData: IDefaultPropData<TPropType>
  ): TPropType;
  updateComponentProp(id: string, name: string, value: unknown): void;
  getComponent(id: string): IComponentData;
  getComponentProp<TPropType = unknown>(
    id: string,
    name: string
  ): IPropData<TPropType>;
}

export interface IComponentData {
  id: string;
  name?: string;
  parentId: string;
  component: string;
  props: Record<string, IPropData>;
  childrenPropData?: Record<string, IComponentData>;
}

export interface IPropData<TPropType = unknown> {
  name: string;
  value?: TPropType;
  typeInfo: ITypeInfo;
}

export interface IDefaultPropData<TPropType = unknown> {
  name: string;
  typeInfo: ITypeInfo<TPropType>;
}

export interface IWeblancerComponentProps {
  defineProp<TPropType = unknown>(
    propData: IDefaultPropData<TPropType>
  ): TPropType;
  children?: ReactNode;
}
