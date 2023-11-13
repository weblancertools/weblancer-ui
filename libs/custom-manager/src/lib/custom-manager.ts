import { IEditorUIPlugin, IManager } from '@weblancer-ui/types';
import { inject, injectable } from 'inversify';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { ICustomManagerActions } from './types';
import { CustomManagerService } from './constants';
import {
  IStateManagerActions,
  StateManager,
} from '@weblancer-ui/state-manager';

@injectable()
export class CustomManager extends IManager implements ICustomManagerActions {
  public name = CustomManagerService;
  public uiPlugin?: IEditorUIPlugin;

  constructor(
    @inject(StateManager) private stateManager: IStateManagerActions
  ) {
    super();
  }

  test(): void {
    throw new Error('Method not implemented.');
  }
}

Weblancer.registerManager<ICustomManagerActions>(CustomManager);
