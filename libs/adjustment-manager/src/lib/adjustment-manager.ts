import { inject, injectable } from 'inversify';
import {
  AdjustmentManagerService,
  IAdjustmentManagerActions,
  IStoreRootState,
} from './types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import adjustmentSlice, {
  addAdjustment,
  setStateValue,
} from './slice/adjustmentSlice';
import { ReactNode, RefObject } from 'react';

@injectable()
export class AdjustmentManager
  extends IManagerWithStore
  implements IAdjustmentManagerActions
{
  public sliceReducer = adjustmentSlice;
  public name = AdjustmentManagerService;
  public allRootRef: Record<string, React.RefObject<HTMLDivElement>> = {};

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  addItemRootRef(
    itemId: string,
    rootRef: React.RefObject<HTMLDivElement>
  ): void {
    this.allRootRef[itemId] = rootRef;
  }

  getItemRootRef(itemId: string): RefObject<HTMLDivElement> {
    return this.allRootRef[itemId];
  }

  setHoveredContainerId(itemId: string | null): void {
    this.storeManager.dispatch(
      setStateValue({ key: 'hoveredContainerId', value: itemId })
    );
  }

  getHoveredContainerId(): string | null | undefined {
    return this.storeManager.getState<IStoreRootState>()[
      AdjustmentManagerService
    ].hoveredContainerId;
  }

  setMouseOverItemId(itemId: string | null): void {
    this.storeManager.dispatch(
      setStateValue({ key: 'mouseOverItemId', value: itemId })
    );
  }

  getMouseOverItemId(): string | null | undefined {
    return this.storeManager.getState<IStoreRootState>()[
      AdjustmentManagerService
    ].mouseOverItemId;
  }

  setSelectedItemId(itemId: string | null): void {
    this.storeManager.dispatch(
      setStateValue({ key: 'selectedItemId', value: itemId })
    );
  }

  getSelectedItemId(): string | null | undefined {
    return this.storeManager.getState<IStoreRootState>()[
      AdjustmentManagerService
    ].selectedItemId;
  }

  setDraggingItemId(itemId: string | null): void {
    this.storeManager.dispatch(
      setStateValue({ key: 'draggingItemId', value: itemId })
    );
  }

  getDraggingItemId(): string | null | undefined {
    return this.storeManager.getState<IStoreRootState>()[
      AdjustmentManagerService
    ].draggingItemId;
  }
}

weblancerRegistry.registerManager<IAdjustmentManagerActions>(AdjustmentManager);
