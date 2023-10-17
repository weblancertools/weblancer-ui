import { WeblancerWindowType } from '@weblancer-ui/types';

export const WeblancerManagerService = 'WeblancerManager';

export interface IWeblancerManagerActions {
  isEditor(): boolean;
  isPreview(): boolean;
  isLive(): boolean;
  setType(type: WeblancerWindowType): void;
}
