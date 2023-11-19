/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';
import { PropProvider } from './propProvider/propProvider';

export const PropProviderService = 'PropProviderManager';

export interface IPropProviderActions {
  addProvider(
    itemId: string,
    propName: string,
    propProviderClass: any,
    providerKey: string,
    providerData: unknown,
    forceId?: string
  ): string;
  removeProvider(itemId: string, propName: string, providerId: string): void;
  getItemPropProviders(itemId: string, propName: string): PropProvider[];
  registerProviderFactory(providerFactory: IProviderFactory): void;
  getProviderFactories(): Record<string, IProviderFactory>;
}

export interface IProvider<TValue = unknown> {
  key: string;
  name: string;
  description: string;
  propProviderClass: any;
  onProvide?(value: TValue): void;
  prepareData?: any[];
}

export interface IProviderFactory {
  key: string;
  name: string;
  component: ProviderFactoryComponent;
  propProviderClass: any;
}

export type ProviderFactoryComponent =
  ComponentType<IProviderFactoryComponentProps>;

export interface IProviderFactoryComponentProps {
  onProviderCreated(factory: IProviderFactory, data: unknown): void;
  onClose(): void;
}
