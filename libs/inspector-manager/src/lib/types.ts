export const InspectorManagerService = 'InspectorManager';

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
