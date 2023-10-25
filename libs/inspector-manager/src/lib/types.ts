import { ReactNode } from 'react';

export const InspectorManagerService = 'InspectorManager';

export interface IInspectorManagerActions {
  addInspector(key: string, node: ReactNode): void;
  getInspector(key: string): ReactNode;
}
