/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {
  IComponentMap,
  IComponentRegisterMetadata,
  IManager,
  WeblancerComponent,
} from '@weblancer-ui/types';
import { weblancerContainer } from './container/container';
import { Store } from '@reduxjs/toolkit';
import { StoreService } from './manager-registry/storeService';

export class Weblancer {
  private static componentMap: IComponentMap = {};

  public static registerManager<TActions>(managerClass: any) {
    if (weblancerContainer.isBound(managerClass)) return;

    bindDependencies(managerClass);

    return weblancerContainer
      .bind<TActions>(managerClass)
      .to(managerClass)
      .inSingletonScope();
  }

  public static getManagerInstance<TClass>(_class: any) {
    return weblancerContainer.get<TClass>(_class);
  }

  public static bindHandler(_handlerClass: any) {
    bindDependencies(_handlerClass);

    weblancerContainer.bind(_handlerClass).toSelf();
  }

  public static getHandlerInstance<Type>(_handlerClass: {
    new (...args: any[]): Type;
  }) {
    return weblancerContainer.get<Type>(_handlerClass);
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

  private static store: Store;

  public static setStore(store: Store) {
    Weblancer.store = store;

    if (!weblancerContainer.isBound(StoreService))
      weblancerContainer
        .bind(StoreService)
        .toDynamicValue(() => Weblancer.store);
  }

  public static clear() {
    weblancerContainer.unbindAll();
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
