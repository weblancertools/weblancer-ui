import { inject, injectable } from 'inversify';
import { PropManagerService } from './constants';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import {
  IComponentData,
  IDefaultPropData,
  IPropManagerActions,
  IStoreRootState,
} from './types';
import propSlice, {
  addComponent,
  defineComponentProp,
  removeComponent,
  updateComponentProp,
} from './slice/propSlice';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

@injectable()
export class PropManager
  extends IManagerWithStore
  implements IPropManagerActions
{
  public name = PropManagerService;
  public sliceReducer = propSlice;

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  addComponent(componentData: IComponentData): void {
    this.storeManager.dispatch(addComponent({ componentData }));
  }

  removeComponent(id: string): void {
    this.storeManager.dispatch(removeComponent({ id }));
  }

  defineComponentProp<TPropType>(
    id: string,
    propData: IDefaultPropData<TPropType>
  ): TPropType {
    if (!this.getComponent(id)) {
      this.storeManager.dispatch(defineComponentProp({ id, propData }));

      return propData.defaultValue as TPropType;
    } else {
      return this.getComponentProp(id, propData.name);
    }
  }

  updateComponentProp(id: string, name: string, value: unknown): void {
    this.storeManager.dispatch(updateComponentProp({ id, name, value }));
  }

  getComponent(id: string): IComponentData {
    return this.storeManager.getState<IStoreRootState>().PropManager
      .componentMap[id];
  }

  getComponentProp<TPropType>(id: string, name: string): TPropType {
    return this.getComponent(id).props[name].value as TPropType;
  }
}

weblancerRegistry.registerManager<IPropManagerActions>(PropManager);
