import { IManager, WeblancerWindowType } from '@weblancer-ui/types';
import { IWeblancerManagerActions, WeblancerManagerService } from './types';
import { injectable } from 'inversify';

@injectable()
export class WeblancerManager
  extends IManager
  implements IWeblancerManagerActions
{
  public name = WeblancerManagerService;
  private windowType: WeblancerWindowType = 'editor';

  setType(type: WeblancerWindowType): void {
    this.windowType = type;
  }

  isEditor(): boolean {
    return this.windowType === 'editor';
  }

  isPreview(): boolean {
    return this.windowType === 'preview';
  }

  isLive(): boolean {
    return this.windowType === 'live';
  }
}
