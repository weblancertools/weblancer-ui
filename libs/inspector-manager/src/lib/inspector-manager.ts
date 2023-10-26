import { IManager } from '@weblancer-ui/types';
import { injectable } from 'inversify';
import {
  IInspectorData,
  IInspectorManagerActions,
  InspectorManagerService,
} from './types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import { importInspectors } from './helpers';

@injectable()
export class InspectorManager
  extends IManager
  implements IInspectorManagerActions
{
  public name = InspectorManagerService;
  public inspectors: Record<string, IInspectorData> = {};

  constructor() {
    super();

    importInspectors();
  }

  addInspector(inspector: IInspectorData): void {
    this.inspectors[inspector.key] = inspector;
  }

  getInspector(key: string): IInspectorData {
    return this.inspectors[key];
  }

  public static addInspector(inspector: IInspectorData): void {
    weblancerRegistry
      .getManagerInstance<IInspectorManagerActions>(InspectorManager)
      .addInspector(inspector);
  }
}

weblancerRegistry.registerManager<IInspectorManagerActions>(InspectorManager);
