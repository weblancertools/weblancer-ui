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
  updateComponent,
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
    if (!this.getComponent(id) || !this.getComponent(id).props[propData.name]) {
      // Because the prop is defined while rendering, we wait for render completion and the define the props
      setTimeout(() => {
        this.storeManager.dispatch(
          defineComponentProp({
            id,
            propData,
            biggestBreakpointId: this.allBreakpoints[0].id,
          })
        );
      }, 0);

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
    const x = this.storeManager.getState<IStoreRootState>();

    return this.storeManager.getState<IStoreRootState>().PropManager
      .componentMap[id];
  }

  updateComponent(
    id: string,
    newData: Pick<IComponentData, 'parentId' | 'name' | 'childrenPropData'>
  ): void {
    this.storeManager.dispatch(updateComponent({ id, newData }));
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

  getComponentChangeSelector(id: string) {
    if (!this.selectorCache[id]) {
      const componentData = this.getComponent(id);
      this.selectorCache[id] = createDraftSafeSelector(
        [
          (store: IStoreRootState) => store.PropManager.componentMap[id],
          ...Object.keys(componentData.props).map((propName) => {
            return createDraftSafeSelector(
              [
                (store: IStoreRootState) => {
                  const availableBreakpoint =
                    getFirstUpperBreakpointOverrideInComponentData(
                      this.getComponent(id),
                      propName,
                      this.currentBreakpointId,
                      this.allBreakpoints
                    );
                  return this.getComponent(id).props[propName][
                    availableBreakpoint
                  ]?.value;
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

  getComponentPropChangeSelector(id: string, propName: string) {
    const key = `${id}_${propName}`;
    if (!this.selectorCache[key]) {
      this.selectorCache[key] = createDraftSafeSelector(
        [
          (store: IStoreRootState) => {
            const availableBreakpoint =
              getFirstUpperBreakpointOverrideInComponentData(
                this.getComponent(id),
                propName,
                this.currentBreakpointId,
                this.allBreakpoints
              );
            return this.getComponent(id).props[propName][availableBreakpoint]
              ?.value;
          },
          (store: IStoreRootState) => this.currentBreakpointId,
        ],
        (value) => value
      );
    }

    return this.selectorCache[key];
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
