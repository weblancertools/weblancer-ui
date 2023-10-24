import { IManager } from '@weblancer-ui/types';
import { injectable } from 'inversify';
import { AdjustmentManagerService, IAdjustmentManagerActions } from './types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

@injectable()
export class AdjustmentManager
  extends IManager
  implements IAdjustmentManagerActions
{
  public name = AdjustmentManagerService;
  public allRootRef: Record<string, React.RefObject<HTMLDivElement>> = {};

  addItemRootRef(
    itemId: string,
    rootRef: React.RefObject<HTMLDivElement>
  ): void {
    this.allRootRef[itemId] = rootRef;
  }
}

weblancerRegistry.registerManager<IAdjustmentManagerActions>(AdjustmentManager);
