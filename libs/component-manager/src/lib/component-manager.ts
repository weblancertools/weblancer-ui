import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { inject, injectable } from 'inversify';
import {
  IComponentManagerActions,
  IComponentMap,
  IStoreRootState,
  WeblancerComponent,
} from './types';
import componentSlice, { addComponent } from './slice/componentSlice';
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

    this.loadComponents();
  }

  private loadComponents = () => {
    Object.values(componentMap).forEach((componentHolder) => {
      this.storeManager.dispatch(addComponent(componentHolder));
    });
  };

  private loadComponent = (key: string) => {
    this.storeManager.dispatch(addComponent(componentMap[key]));
  };

  getAllComponents(): IComponentMap {
    return this.storeManager.getState<IStoreRootState>().ComponentManager
      .componentMap;
  }

  getComponentByKey(key: string): WeblancerComponent {
    const componentMap =
      this.storeManager.getState<IStoreRootState>().ComponentManager
        .componentMap;

    if (!componentMap[key])
      throw new Error('Can not access to a non-registered component');

    return componentMap[key].component;
  }

  public static register(
    key: string,
    label: string,
    component: WeblancerComponent,
    group: string | string[] = 'Others'
  ) {
    componentMap[key] = {
      key,
      label,
      group,
      component,
    };

    // weblancerRegistry
    //   .getManagerInstance<ComponentManager>(ComponentManager)
    //   .loadComponent(key);
  }
}

weblancerRegistry.registerManager<IComponentManagerActions>(ComponentManager);
