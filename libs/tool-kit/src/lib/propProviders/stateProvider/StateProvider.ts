import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { inject, injectable } from 'inversify';
import {
  IStateManagerRootState,
  StateManagerService,
} from '@weblancer-ui/state-manager';
import { importManager } from '@weblancer-ui/utils';
import {
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { Unsubscribe } from '@reduxjs/toolkit';
import { PropProvider } from '@weblancer/prop-provider';

export const ProviderKey = 'StateProvider';
export const ProviderName = 'State provider';

@injectable()
@importManager([PropManager, StoreManager])
export class StateProvider extends PropProvider<unknown, string> {
  key = ProviderKey;
  name = ProviderName;
  get description(): string {
    return `Provide from state: ${this.data}`;
  }

  constructor(
    @inject(PropManager) public propManager: IPropManagerActions,
    @inject(StoreManager) public storeManager: IStoreManagerActions
  ) {
    super(propManager);
  }

  private subscription?: Unsubscribe;
  public listen(stateKey: string): void {
    console.log('listen', stateKey);
    this.subscription = this.storeManager.listen<
      IStateManagerRootState,
      string
    >(
      (state) => state[StateManagerService][stateKey].value as string,
      (value) => this.onProvide(value),
      { callImmediately: true }
    );
  }

  public dispose?(): void {
    this.subscription?.();
  }
}
