import { IEditorUIPlugin, IManager } from '@weblancer-ui/types';
import { inject, injectable } from 'inversify';
import { weblancerContainer } from '@weblancer-ui/editor-core';
import { CUSTOM_MANAGER_NAME } from './constants';
import { IStoreRootState } from './types';
import {
  CustomManagerService,
  ICustomManagerActions,
  IStateManagerActions,
  StateManagerService,
} from '@weblancer-ui/manager-registry';

@injectable()
export class CustomManager
  extends IManager<IStoreRootState>
  implements ICustomManagerActions
{
  public name = CUSTOM_MANAGER_NAME;
  public uiPlugin?: IEditorUIPlugin;

  constructor(@inject(StateManagerService) stateManager: IStateManagerActions) {
    super();
    // TODO
  }

  test(): void {
    throw new Error('Method not implemented.');
  }

  static getInstance() {
    return weblancerContainer.get<CustomManager>(CustomManagerService);
  }
}

weblancerContainer
  .bind<ICustomManagerActions>(CustomManagerService)
  .toSelf()
  .inSingletonScope();
