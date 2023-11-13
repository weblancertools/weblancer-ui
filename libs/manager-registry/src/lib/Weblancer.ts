/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IComponentMap,
  IComponentRegisterMetadata,
  WeblancerComponent,
} from '@weblancer-ui/types';
import { weblancerContainer } from './container/container';
import { Store } from '@reduxjs/toolkit';
import { StoreService } from './manager-registry/storeService';

export class Weblancer {
  private static hasStore = false;
  private static componentMap: IComponentMap = {};

  public static registerManager<TActions>(managerClass: any) {
    return weblancerContainer
      .bind<TActions>(managerClass)
      .to(managerClass)
      .inSingletonScope();
  }

  public static getManagerInstance<TClass>(_class: any) {
    return weblancerContainer.get<TClass>(_class);
  }

  public static bindAction(_actionClass: any) {
    weblancerContainer.bind(_actionClass).toSelf();
  }

  public static registerComponent(
    key: string,
    component: WeblancerComponent,
    metadata?: IComponentRegisterMetadata
  ) {
    Weblancer.componentMap[key] = {
      key,
      component,
      metadata,
    };
  }

  public static getComponentMap() {
    return Weblancer.componentMap;
  }

  public static setStore(store: Store) {
    if (Weblancer.hasStore) return;

    Weblancer.hasStore = true;
    weblancerContainer.bind(StoreService).toDynamicValue(() => store);
  }
}
