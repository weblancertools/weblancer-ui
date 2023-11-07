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
import {
  ILayoutManagerActions,
  LayoutManager,
} from '@weblancer-ui/layout-manager';
import {
  generateRandomString,
  waitForComponentPropsDefined,
} from '@weblancer-ui/utils';
import { IComponentMetadata } from '@weblancer-ui/types';

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
    position: { x: number; y: number },
    forceItemId?: string,
    onItemCreated?: (itemId: string) => void
  ) {
    const parentComponentData = this.propManager.getComponent(parentId);

    const componentHolder = this.getComponentHolderByKey(componentKey);

    if (!parentComponentData) throw new Error('Parent not found');

    if (forceItemId && this.propManager.getComponent(forceItemId))
      throw new Error('Item id exist');

    const newComponentId = forceItemId ?? this.getRandomId();

    this.propManager.addComponent({
      id: newComponentId,
      parentId,
      componentKey,
      props: {},
      ...componentHolder.metadata?.defaultComponentData,
    });

    waitForComponentPropsDefined(
      newComponentId,
      this.layoutManager.getClientDocument(),
      () => {
        this.layoutManager.setPositionInParent(newComponentId, position);
        onItemCreated?.(newComponentId);
      }
    );
  }

  deleteItem(itemId: string): void {
    this.propManager.removeComponent(itemId);
  }

  getMetadata(itemId: string): IComponentMetadata | undefined {
    const componentData = this.propManager.getComponent(itemId);

    if (!componentData) return;

    return componentMap[componentData.componentKey].metadata?.componentMetadata;
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
