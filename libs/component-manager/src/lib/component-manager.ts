import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { inject, injectable } from 'inversify';
import { IComponentManagerActions } from './types';
import componentSlice from './slice/componentSlice';
import { ComponentManagerService } from './constants';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import {
  ILayoutManagerActions,
  LayoutManager,
} from '@weblancer-ui/layout-manager';
import {
  generateRandomString,
  importManager,
  waitForComponentPropsDefined,
} from '@weblancer-ui/utils';
import {
  IComponentHolder,
  IComponentMap,
  IComponentMetadata,
  WeblancerComponent,
} from '@weblancer-ui/types';

@injectable()
@importManager([StoreManager, PropManager, LayoutManager])
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
    return Weblancer.getComponentMap();
  }

  getComponentByKey(key: string): WeblancerComponent {
    if (!Weblancer.getComponentMap()[key])
      throw new Error('Can not access to a non-registered component');

    return Weblancer.getComponentMap()[key].component;
  }

  getComponentHolderByKey(key: string): IComponentHolder {
    if (!Weblancer.getComponentMap()[key])
      throw new Error('Can not access to a non-registered component');

    return Weblancer.getComponentMap()[key];
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

    return newComponentId;
  }

  deleteItem(itemId: string): void {
    this.propManager.removeComponent(itemId);
  }

  getMetadata(itemId: string): IComponentMetadata | undefined {
    const componentData = this.propManager.getComponent(itemId);

    if (!componentData) return;

    return Weblancer.getComponentMap()[componentData.componentKey].metadata
      ?.componentMetadata;
  }
}
