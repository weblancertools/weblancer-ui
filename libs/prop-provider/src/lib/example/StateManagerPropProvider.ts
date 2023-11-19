import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { PropProvider } from '../propProvider/propProvider';
import { inject } from 'inversify';
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

export const ProviderKey = 'StateManagerPropProvider';
export const ProviderName = 'State manager prop provider';

@importManager([PropManager, StoreManager])
export class StateManagerPropProvider extends PropProvider<unknown, string> {
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
