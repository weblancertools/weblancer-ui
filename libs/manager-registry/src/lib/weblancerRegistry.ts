import { Store } from '@reduxjs/toolkit';
import { weblancerContainer } from './container/container';
import { StoreService } from './manager-registry/storeService';
import { WeblancerWindowType } from '@weblancer-ui/types';
import { IWeblancerManagerActions } from './core-managers/weblancer-manager/types';
import { WeblancerManager } from './core-managers/weblancer-manager/weblancer-manager';

class WeblancerRegistry {
  private hasStore = false;

  constructor() {
    this.registerManager<IWeblancerManagerActions>(WeblancerManager);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerManager<TActions>(_class: any) {
    return weblancerContainer
      .bind<TActions>(_class)
      .to(_class)
      .inSingletonScope();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getManagerInstance<TClass>(_class: any) {
    return weblancerContainer.get<TClass>(_class);
  }

  public setStore(store: Store) {
    if (this.hasStore) return;

    this.hasStore = true;
    weblancerContainer.bind(StoreService).toDynamicValue(() => store);
  }

  public setWindowType(type: WeblancerWindowType) {
    weblancerContainer
      .get<IWeblancerManagerActions>(WeblancerManager)
      .setType(type);
  }
}

export const weblancerRegistry = new WeblancerRegistry();
