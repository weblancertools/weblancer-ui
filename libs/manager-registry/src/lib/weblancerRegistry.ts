import { Store } from '@reduxjs/toolkit';
import { weblancerContainer } from './container/container';
import { StoreService } from './manager-registry/storeService';

class WeblancerRegistry {
  private hasStore = false;
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
}

export const weblancerRegistry = new WeblancerRegistry();
