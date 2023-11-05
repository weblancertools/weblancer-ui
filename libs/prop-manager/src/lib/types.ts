import { IReduxSelector, ITypeInfo } from '@weblancer-ui/types';
import { PropManagerService } from './constants';
import { ReactNode } from 'react';

export interface IStoreRootState {
  [PropManagerService]: IPropManagerSlice;
  [key: string]: unknown;
}

export interface IPropManagerSlice {
  pageId: string;
  componentMap: Record<string, IComponentData>;
}

export interface IPropManagerActions {
  setPageData(
    componentMap: Record<string, IComponentData>,
    pageId: string
  ): void;
  getPageData(): Omit<IComponentData, 'parentId'>;
  addComponent(componentData: IComponentData): void;
  removeComponent(id: string): void;
  defineComponentProp<TPropType = unknown>(
    id: string,
    propData: IDefaultPropData<TPropType>
  ): TPropType;
  updateComponentProp<TValue = unknown>(
    id: string,
    name: string,
    value: TValue
  ): void;
  deepAssignComponentProp<TValue>(
    id: string,
    name: string,
    value: TValue
  ): void;
  updateComponent(
    id: string,
    newComponentData: Partial<
      Pick<IComponentData, 'name' | 'parentId' | 'children'>
    >
  ): void;
  getComponent(id: string): IComponentData | undefined;
  getComponentProp<TPropType = unknown>(
    id: string,
    name: string
  ): IPropData<TPropType>;
  getComponentChangeSelector(id: string): ReturnType<IReduxSelector>;
  getComponentPropChangeSelector(
    id: string,
    propName: string
  ): ReturnType<IReduxSelector>;
  getPageDataSelector(): ReturnType<IReduxSelector>;
}

export interface IComponentData {
  id: string;
  name?: string;
  parentId: string;
  componentKey: string;
  metadata?: IComponentMetadata;
  props: Record<string, IBreakPointPropsData>;
  children?: string[];
}

export interface IComponentMetadata {
  isContainer?: boolean;
}

export interface IBreakPointPropsData<TPropType = unknown> {
  [breakpointName: string]: IPropData<TPropType> | undefined;
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
