import { StateManager } from '@weblancer-ui/state-manager';
import { Manager } from '@weblancer-ui/types';

export function getDefaultManagers(): Manager[] {
  return [new StateManager()];
}
