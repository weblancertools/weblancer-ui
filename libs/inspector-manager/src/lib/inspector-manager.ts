import { IManager } from '@weblancer-ui/types';
import { injectable } from 'inversify';
import { IInspectorManagerActions, InspectorManagerService } from './types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import { ReactNode } from 'react';
import { importInspectors } from './helpers';

@injectable()
export class InspectorManager
  extends IManager
  implements IInspectorManagerActions
{
  public name = InspectorManagerService;
  public inspectors: Record<string, ReactNode> = {};

  constructor() {
    super();

    importInspectors();
  }

  addInspector(key: string, node: ReactNode): void {
    this.inspectors[key] = node;
  }

  getInspector(key: string): ReactNode {
    return this.inspectors[key];
  }

  public static addInspector(key: string, node: ReactNode): void {
    weblancerRegistry
      .getManagerInstance<IInspectorManagerActions>(InspectorManager)
      .addInspector(key, node);
  }
}

weblancerRegistry.registerManager<IInspectorManagerActions>(InspectorManager);
