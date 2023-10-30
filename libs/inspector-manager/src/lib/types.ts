import { DrawerState } from '@weblancer-ui/types';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const InspectorManagerService = 'InspectorManager';

export interface IInspectorManagerSlice {
  state: DrawerState;
}

export interface IStoreRootState {
  [InspectorManagerService]: IInspectorManagerSlice;
  [key: string]: unknown;
}

export interface IInspectorManagerActions {
  addInspector(inspector: IInspectorData): void;
  getInspector(key: string): IInspectorData;
}

export interface IInspectorData {
  key: string;
  node: React.ComponentType<IInspectorComponentProps>;
  metadata?: IInspectorMetadata;
}

export interface IInspectorMetadata {
  targetComponentKey?: string;
  group?: string;
}

export interface IInspectorComponentProps {
  itemId: string;
  propName: string;
}

export const useInspectorManagerSelector: TypedUseSelectorHook<IStoreRootState> =
  useSelector;
