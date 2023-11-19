/* eslint-disable @typescript-eslint/no-explicit-any */
import { Weblancer } from '@weblancer-ui/manager-registry';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { importManager } from '@weblancer-ui/utils';
import { inject, injectable } from 'inversify';

@injectable()
@importManager(PropManager)
export abstract class PropProvider<TValue = unknown, TData = unknown> {
  abstract key: string;
  abstract name: string;
  abstract get description(): string;
  public id!: string;
  public itemId!: string;
  public propName!: string;
  public started = false;
  public data!: TData;

  constructor(@inject(PropManager) public propManager: IPropManagerActions) {}

  public start() {
    if (this.started) return;

    this.started = true;

    this.listen(this.data);
  }

  public stop() {
    this.started = false;

    this.dispose?.();
  }

  public onProvide(value: TValue) {
    console.log('onProvide', value);
    this.propManager.updateComponentProp(this.itemId, this.propName, value);
  }

  public abstract listen(data: TData): void;
  public abstract dispose?(): void;

  public static createProvider<
    TValue,
    TData,
    Type extends PropProvider<TValue, TData>
  >(
    _providerClass: {
      new (...args: any[]): Type;
    },
    info: {
      id: string;
      itemId: string;
      propName: string;
      data: TData;
    }
  ) {
    const instance = Weblancer.getHandlerInstance<Type>(_providerClass);

    Object.assign(instance, info);

    return instance;
  }
}
