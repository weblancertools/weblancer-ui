import { IEditorUIPlugin, IManager } from '@weblancer-ui/types';
import { injectable } from 'inversify';
import { CUSTOM_MANAGER_NAME } from './constants';
import { IStoreRootState } from './types';
import {
  CustomManagerService,
  ICustomManagerActions,
  weblancerRegistry,
} from '@weblancer-ui/manager-registry';

@injectable()
export class CustomManager
  extends IManager<IStoreRootState>
  implements ICustomManagerActions
{
  public name = CUSTOM_MANAGER_NAME;
  public uiPlugin?: IEditorUIPlugin;

  constructor() {
    super();
    // TODO
  }

  test(): void {
    throw new Error('Method not implemented.');
  }

  static getInstance() {
    return weblancerRegistry.getManagerInstance<CustomManager>(
      CustomManagerService
    );
  }
}

weblancerRegistry.registerManager<ICustomManagerActions>(
  CustomManager,
  CustomManagerService
);

// weblancerContainer
//   .bind<ICustomManagerActions>(CustomManagerService)
//   .toSelf()
//   .inSingletonScope();
