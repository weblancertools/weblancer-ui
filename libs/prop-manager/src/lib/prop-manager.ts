import { IManager } from '@weblancer-ui/types';
import { inject, injectable } from 'inversify';
import { PropManagerService } from './constants';
import {
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { IPropManagerActions } from './types';
import propSlice from './slice/propSlice';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

@injectable()
export class PropManager extends IManager implements IPropManagerActions {
  public name = PropManagerService;

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.storeManager.injectSlice(PropManagerService, propSlice);
  }

  test?: string | undefined;
}

weblancerRegistry.registerManager<IPropManagerActions>(PropManager);
