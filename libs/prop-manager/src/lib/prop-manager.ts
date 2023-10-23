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
  IPropData,
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

  defineProp<TPropType>(
    id: string,
    propData: IDefaultPropData<TPropType>
  ): TPropType {
    if (!this.getComponent(id)) {
      this.storeManager.dispatch(defineComponentProp({ id, propData }));

      return propData.typeInfo.defaultValue as TPropType;
    } else {
      return this.getComponentProp<TPropType>(id, propData.name)
        .value as TPropType;
    }
  }

  updateComponentProp(id: string, name: string, value: unknown): void {
    this.storeManager.dispatch(updateComponentProp({ id, name, value }));
  }

  getComponent(id: string): IComponentData {
    return this.storeManager.getState<IStoreRootState>().PropManager
      .componentMap[id];
  }

  getComponentProp<TPropType>(id: string, name: string): IPropData<TPropType> {
    return this.getComponent(id).props[name] as IPropData<TPropType>;
  }
}

weblancerRegistry.registerManager<IPropManagerActions>(PropManager);
