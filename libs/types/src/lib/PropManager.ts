import { ReactNode } from 'react';
import { ITypeInfo } from './ITypeInfo';

export interface IComponentData {
  id: string;
  name?: string;
  parentId: string;
  componentKey: string;
  props: Record<string, IBreakPointPropsData>;
  children?: string[];
}

export interface IBreakPointPropsData<TPropType = unknown> {
  [breakpointName: string]: IPropData<TPropType> | undefined;
}

export interface IPropData<TPropType = unknown> {
  name: string;
  value?: TPropType;
  typeInfo?: ITypeInfo;
  providers?: Record<string, IPropProviderInfo>;
}

export interface IPropProviderInfo<TData = unknown> {
  id: string;
  key: string;
  data: TData;
}

export interface IDefaultPropData<TPropType = unknown> {
  name: string;
  typeInfo: ITypeInfo<TPropType>;
}

export interface IWeblancerComponentProps {
  itemId: string;
  defineProp<TPropType = unknown>(
    propData: IDefaultPropData<TPropType>
  ): TPropType;
  children?: ReactNode;
}
