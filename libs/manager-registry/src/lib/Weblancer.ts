/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {
  IComponentMap,
  IComponentRegisterMetadata,
  IManager,
  WeblancerComponent,
} from '@weblancer-ui/types';
import { weblancerManagerContainer } from './containers/managerContainer';
import { Store } from '@reduxjs/toolkit';
import { StoreService } from './manager-registry/storeService';

export class Weblancer {
  private static componentMap: IComponentMap = {};
  private static store?: Store;

  public static registerManager<TActions>(managerClass: any) {
    if (weblancerManagerContainer.isBound(managerClass)) return;

    bindDependencies(managerClass);
    weblancerManagerContainer
      .bind<TActions>(managerClass)
      .to(managerClass)
      .inSingletonScope();
  }

  public static getManagerInstance<TClass>(_class: any) {
    Weblancer.registerManager(_class);
    return weblancerManagerContainer.get<TClass>(_class);
  }

  public static bindHandler(handlerClass: any) {
    if (weblancerManagerContainer.isBound(handlerClass)) return;

    bindDependencies(handlerClass);

    weblancerManagerContainer.bind(handlerClass).toSelf();
  }

  public static getHandlerInstance<Type>(handlerClass: {
    new (...args: any[]): Type;
  }) {
    Weblancer.bindHandler(handlerClass);

    return weblancerManagerContainer.get<Type>(handlerClass);
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
    Weblancer.store = store;

    if (!weblancerManagerContainer.isBound(StoreService))
      weblancerManagerContainer
        .bind(StoreService)
        .toDynamicValue(() => Weblancer.store);
  }

  public static async clear() {
    weblancerManagerContainer.unbindAll();
    Weblancer.componentMap = {};
    Weblancer.store = undefined;
  }
}

function bindDependencies(_class: any) {
  const dependencies:
    | (new (...args: any[]) => IManager)
    | (new (...args: any[]) => IManager)[] = Reflect.getOwnMetadata(
    'dependencies',
    _class
  );

  if (!dependencies) return;

  if (Array.isArray(dependencies)) {
    for (const _d of dependencies) {
      Weblancer.registerManager(_d);
    }
  } else {
    Weblancer.registerManager(dependencies);
  }
}
