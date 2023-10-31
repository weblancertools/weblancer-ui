import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { inject, injectable } from 'inversify';
import {
  IComponentHolder,
  IComponentManagerActions,
  IComponentMap,
  IComponentRegisterMetadata,
  WeblancerComponent,
} from './types';
import componentSlice from './slice/componentSlice';
import { ComponentManagerService } from './constants';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { generateRandomString } from './helpers';
import {
  ILayoutManagerActions,
  LayoutManager,
} from '@weblancer-ui/layout-manager';

const componentMap: IComponentMap = {};

@injectable()
export class ComponentManager
  extends IManagerWithStore
  implements IComponentManagerActions
{
  public sliceReducer = componentSlice;
  public name = ComponentManagerService;

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions,
    @inject(PropManager) private readonly propManager: IPropManagerActions,
    @inject(LayoutManager)
    private readonly layoutManager: ILayoutManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  private getRandomId(): string {
    return generateRandomString(8);
  }

  getAllComponents(): IComponentMap {
    return componentMap;
  }

  getComponentByKey(key: string): WeblancerComponent {
    if (!componentMap[key])
      throw new Error('Can not access to a non-registered component');

    return componentMap[key].component;
  }

  getComponentHolderByKey(key: string): IComponentHolder {
    if (!componentMap[key])
      throw new Error('Can not access to a non-registered component');

    return componentMap[key];
  }

  createItem(
    componentKey: string,
    parentId: string,
    position: { x: number; y: number }
  ): void {
    const parentComponentData = this.propManager.getComponent(parentId);

    const componentHolder = this.getComponentHolderByKey(componentKey);

    if (!parentComponentData) return;

    const newComponentId = this.getRandomId();

    // This must add component tp its parent and rerender it
    this.propManager.addComponent({
      id: newComponentId,
      parentId,
      componentKey,
      props: {},
      ...componentHolder.metadata?.defaultComponentData,
    });

    // TODO wait for rendering item

    setTimeout(() => {
      this.layoutManager.setPositionInParent(newComponentId, position);
    }, 0);
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
