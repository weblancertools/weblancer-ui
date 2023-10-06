import { StateManager } from '@weblancer-ui/state-manager';
import { IManager } from '@weblancer-ui/types';

export function getDefaultManagers(): IManager[] {
  return [new StateManager()];
}
