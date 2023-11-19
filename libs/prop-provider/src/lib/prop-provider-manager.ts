/* eslint-disable @typescript-eslint/no-explicit-any */
import { IManager, IPropData } from '@weblancer-ui/types';
import { inject, injectable } from 'inversify';
import { generateRandomString, importManager } from '@weblancer-ui/utils';
import {
  IPropProviderActions,
  IProviderFactory,
  PropProviderService,
} from './types';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { PropProvider } from './propProvider/propProvider';

@injectable()
@importManager([PropManager])
export class PropProviderManager
  extends IManager
  implements IPropProviderActions
{
  public name = PropProviderService;
  private providerFactories: Record<string, IProviderFactory> = {};
  private providerMap: Record<string, PropProvider> = {};

  constructor(@inject(PropManager) private propManager: IPropManagerActions) {
    super();

    propManager.addListener({
      onItemPropAdded: this.onPropAdded,
    });
  }

  private onPropAdded(itemId: string, propData: IPropData) {
    const providerIds =
      this.propManager.getComponentProp(itemId, propData.name).providers ?? {};

    Object.keys(providerIds).forEach((id) => {
      if (!this.providerMap[id]) {
        const info = providerIds[id];
        this.providerMap[id] = PropProvider.createProvider(
          this.providerFactories[info.key].propProviderClass,
          {
            id,
            itemId,
            propName: propData.name,
            data: info.data,
          }
        );
      }

      this.providerMap[id].start();
    });
  }

  addProvider(
    itemId: string,
    propName: string,
    propProviderClass: any,
    providerKey: string,
    providerData: unknown,
    forceId?: string
  ): string {
    const providerId = forceId ?? generateRandomString(12);

    const providerInstance = PropProvider.createProvider(propProviderClass, {
      id: providerId,
      itemId,
      propName,
      data: providerData,
    });

    this.providerMap[providerId] = providerInstance;

    this.propManager.addPropProvider(itemId, propName, {
      data: providerData,
      id: providerId,
      key: providerKey,
    });

    providerInstance.start();

    return providerId;
  }

  removeProvider(itemId: string, propName: string, providerId: string): void {
    const provider = this.providerMap[providerId];
    this.propManager.removePropProvider(itemId, propName, providerId);

    provider.stop();
  }

  getItemPropProviders(itemId: string, propName: string): PropProvider[] {
    const providerIds =
      this.propManager.getComponentProp(itemId, propName).providers ?? {};

    return Object.keys(providerIds).map((id) => this.providerMap[id]);
  }

  registerProviderFactory(providerFactory: IProviderFactory): void {
    this.providerFactories[providerFactory.key] = providerFactory;
  }

  getProviderFactories(): Record<string, IProviderFactory> {
    return this.providerFactories;
  }

  public static registerProviderFactory(
    providerFactory: IProviderFactory
  ): void {
    const propProviderManager =
      Weblancer.getManagerInstance<IPropProviderActions>(PropProviderManager);

    propProviderManager.registerProviderFactory(providerFactory);
  }
}
