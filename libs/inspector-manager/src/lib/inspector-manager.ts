import { injectable } from 'inversify';
import {
  IInspectorData,
  IInspectorManagerActions,
  InspectorManagerService,
} from './types';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { IManager } from '@weblancer-ui/types';
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
    Weblancer.getManagerInstance<IInspectorManagerActions>(
      InspectorManager
    ).addInspector(inspector);
  }
}

Weblancer.registerManager<IInspectorManagerActions>(InspectorManager);
