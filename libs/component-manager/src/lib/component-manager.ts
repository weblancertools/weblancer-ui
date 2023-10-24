import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { inject, injectable } from 'inversify';
import {
  IComponentManagerActions,
  IComponentMap,
  IComponentRegisterMetadata,
  WeblancerComponent,
} from './types';
import componentSlice from './slice/componentSlice';
import { ComponentManagerService } from './constants';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

const componentMap: IComponentMap = {};

@injectable()
export class ComponentManager
  extends IManagerWithStore
  implements IComponentManagerActions
{
  public sliceReducer = componentSlice;
  public name = ComponentManagerService;

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  getAllComponents(): IComponentMap {
    return componentMap;
  }

  getComponentByKey(key: string): WeblancerComponent {
    if (!componentMap[key])
      throw new Error('Can not access to a non-registered component');

    return componentMap[key].component;
  }

  public static register(
    key: string,
    component: WeblancerComponent,
    metadata?: IComponentRegisterMetadata
  ) {
    componentMap[key] = {
      key,
      component,
      metadata,
    };
  }
}

weblancerRegistry.registerManager<IComponentManagerActions>(ComponentManager);
