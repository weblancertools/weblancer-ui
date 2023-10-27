import { inject, injectable } from 'inversify';
import {
  IInspectorData,
  IInspectorManagerActions,
  IStoreRootState,
  InspectorManagerService,
} from './types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import { importInspectors } from './helpers';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import inspectorSlice, { setState } from './slice/inspectorSlice';
import { DrawerState } from '@weblancer-ui/types';

@injectable()
export class InspectorManager
  extends IManagerWithStore
  implements IInspectorManagerActions
{
  public sliceReducer = inspectorSlice;
  public name = InspectorManagerService;
  public inspectors: Record<string, IInspectorData> = {};

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);

    importInspectors();
  }

  setInspectorState(state: DrawerState): void {
    this.storeManager.dispatch(setState({ state }));
  }

  getInspectorState(): DrawerState {
    return this.storeManager.getState<IStoreRootState>()[
      InspectorManagerService
    ].state;
  }

  addInspector(inspector: IInspectorData): void {
    this.inspectors[inspector.key] = inspector;
  }

  getInspector(key: string): IInspectorData {
    return this.inspectors[key];
  }

  public static addInspector(inspector: IInspectorData): void {
    weblancerRegistry
      .getManagerInstance<IInspectorManagerActions>(InspectorManager)
      .addInspector(inspector);
  }
}

weblancerRegistry.registerManager<IInspectorManagerActions>(InspectorManager);
