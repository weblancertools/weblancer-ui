import { inject, injectable } from 'inversify';
import { PageDataSelectorKey, PropManagerService } from './constants';
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
  setPageData,
  updateComponentProp,
} from './slice/propSlice';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import {
  BreakpointManager,
  IBreakpointManagerActions,
} from '@weblancer-ui/breakpoint-manager';
import { getFirstUpperBreakpointOverrideInComponentData } from './helpers';
import { IReduxSelector } from '@weblancer-ui/types';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

@injectable()
export class PropManager
  extends IManagerWithStore
  implements IPropManagerActions
{
  public name = PropManagerService;
  public sliceReducer = propSlice;

  private selectorCache: Record<string, ReturnType<IReduxSelector>> = {};

  private get currentBreakpointId() {
    return this.breakpointManager.getCurrentBreakpoint().id;
  }

  private get allBreakpoints() {
    return this.breakpointManager.getSortedBreakpoints();
  }

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions,
    @inject(BreakpointManager)
    private readonly breakpointManager: IBreakpointManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  setPageData(pageData: IComponentData): void {
    this.storeManager.dispatch(setPageData({ pageData }));
  }

  getPageData(): Omit<IComponentData, 'parentId'> {
    return this.storeManager.getState<IStoreRootState>().PropManager.pageData;
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
      this.storeManager.dispatch(
        defineComponentProp({
          id,
          propData,
          biggestBreakpointId:
            this.allBreakpoints[this.allBreakpoints.length - 1].id,
        })
      );

      return propData.typeInfo.defaultValue as TPropType;
    } else {
      return this.getComponentProp<TPropType>(id, propData.name)
        .value as TPropType;
    }
  }

  updateComponentProp(id: string, name: string, value: unknown): void {
    this.storeManager.dispatch(
      updateComponentProp({
        id,
        name,
        value,
        currentBreakpointId: this.currentBreakpointId,
        allBreakpoints: this.allBreakpoints,
      })
    );
  }

  getComponent(id: string): IComponentData {
    return this.storeManager.getState<IStoreRootState>().PropManager
      .componentMap[id];
  }

  getComponentProp<TPropType>(id: string, name: string): IPropData<TPropType> {
    const targetBreakpoint = getFirstUpperBreakpointOverrideInComponentData(
      this.getComponent(id),
      name,
      this.currentBreakpointId,
      this.allBreakpoints
    );

    return this.getComponent(id).props[name][
      targetBreakpoint
    ] as IPropData<TPropType>;
  }

  getComponentPropChangeSelector(id: string) {
    if (!this.selectorCache[id]) {
      const componentData = this.getComponent(id);
      this.selectorCache[id] = createDraftSafeSelector(
        [
          (store: IStoreRootState) => store.PropManager.componentMap[id],
          ...Object.keys(componentData.props).map((propName) => {
            const breakpointPropData = componentData.props[propName];
            return createDraftSafeSelector(
              [
                (store: IStoreRootState) => {
                  const availableBreakpoint =
                    getFirstUpperBreakpointOverrideInComponentData(
                      componentData,
                      propName,
                      this.currentBreakpointId,
                      this.allBreakpoints
                    );
                  return breakpointPropData[availableBreakpoint].value;
                },
                (store: IStoreRootState) => this.currentBreakpointId,
              ],
              (value) => value
            );
          }),
        ],
        (componentData) => ({ ...componentData })
      );
    }

    return this.selectorCache[id];
  }

  getPageDataSelector() {
    if (!this.selectorCache[PageDataSelectorKey]) {
      this.selectorCache[PageDataSelectorKey] = createDraftSafeSelector(
        [(store: IStoreRootState) => store.PropManager.pageData],
        (pageData) => {
          return pageData;
        }
      );
    }

    return this.selectorCache[PageDataSelectorKey];
  }
}

weblancerRegistry.registerManager<IPropManagerActions>(PropManager);
