import { inject, injectable } from 'inversify';
import { PageDataSelectorKey, PropManagerService } from './constants';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import { IPropManagerActions, IPropManagerStoreRootState } from './types';
import propSlice, {
  addComponent,
  deepAssignComponentProp,
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
import {
  IComponentData,
  IDefaultPropData,
  IPropData,
  IReduxSelector,
} from '@weblancer-ui/types';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

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

  setPageData(
    componentMap: Record<string, IComponentData>,
    pageId: string
  ): void {
    this.storeManager.dispatch(setPageData({ componentMap, pageId }));
  }

  getPageData(): Omit<IComponentData, 'parentId'> {
    const pageId =
      this.storeManager.getState<IPropManagerStoreRootState>().PropManager
        .pageId;

    return this.storeManager.getState<IPropManagerStoreRootState>().PropManager
      .componentMap[pageId];
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

  updateComponentProp<TValue>(
    id: string,
    name: string,
    value: TValue,
    ignoreBreakpoint = false
  ): void {
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

  deepAssignComponentProp<TValue>(
    id: string,
    name: string,
    value: TValue,
    ignoreBreakpoint = false
  ): void {
    this.storeManager.dispatch(
      deepAssignComponentProp({
        id,
        name,
        value,
        currentBreakpointId: this.currentBreakpointId,
        allBreakpoints: this.allBreakpoints,
      })
    );
  }

  getComponent(id: string): IComponentData {
    return this.storeManager.getState<IPropManagerStoreRootState>().PropManager
      .componentMap[id];
  }

  updateComponent(
    id: string,
    newData: Partial<Pick<IComponentData, 'parentId' | 'name' | 'children'>>
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
    if (!id) {
      return (state: IPropManagerStoreRootState) => '';
    }

    if (!this.selectorCache[id]) {
      this.selectorCache[id] = createDraftSafeSelector(
        [
          (store: IPropManagerStoreRootState) =>
            store.PropManager.componentMap[id],
          createDraftSafeSelector(
            [
              (store: IPropManagerStoreRootState) => {
                const componentData = this.getComponent(id);

                if (!componentData) return undefined;

                const values: unknown[] = [];
                Object.keys(componentData.props).forEach((propName) => {
                  const availableBreakpoint =
                    getFirstUpperBreakpointOverrideInComponentData(
                      componentData,
                      propName,
                      this.currentBreakpointId,
                      this.allBreakpoints
                    );

                  values.push(
                    componentData.props[propName][availableBreakpoint]?.value
                  );
                });

                return values;
              },
            ],
            (values) => values,
            {
              memoizeOptions: {
                equalityCheck: shallowEqual,
              },
            }
          ),
          (store: IPropManagerStoreRootState) =>
            store.PropManager.componentMap[id],
          (store: IPropManagerStoreRootState) =>
            Object.keys(store.PropManager.componentMap[id]?.children ?? {})
              .length,
        ],
        (componentData) => ({ ...componentData })
      );
    }

    return this.selectorCache[id];
  }

  getComponentPropChangeSelector(id: string, propName: string) {
    if (!id) {
      return (state: IPropManagerStoreRootState) => '';
    }

    const key = `${id}_${propName}`;
    if (!this.selectorCache[key]) {
      this.selectorCache[key] = createDraftSafeSelector(
        [
          (store: IPropManagerStoreRootState) => {
            const componentData = this.getComponent(id);

            if (!componentData) return;

            const availableBreakpoint =
              getFirstUpperBreakpointOverrideInComponentData(
                componentData,
                propName,
                this.currentBreakpointId,
                this.allBreakpoints
              );
            return componentData.props[propName]?.[availableBreakpoint]?.value;
          },
          (store: IPropManagerStoreRootState) => this.currentBreakpointId,
        ],
        (value) => value
      );
    }

    return this.selectorCache[key];
  }

  getPageDataSelector() {
    if (!this.selectorCache[PageDataSelectorKey]) {
      this.selectorCache[PageDataSelectorKey] = createDraftSafeSelector(
        [
          (store: IPropManagerStoreRootState) => store.PropManager.pageId,
          (store: IPropManagerStoreRootState) => store.PropManager.componentMap,
        ],
        (pageId, componentMap) => {
          return componentMap[pageId];
        }
      );
    }

    return this.selectorCache[PageDataSelectorKey];
  }

  getComponentMap(): Record<string, IComponentData> {
    return this.storeManager.getState<IPropManagerStoreRootState>().PropManager
      .componentMap;
  }
}

weblancerRegistry.registerManager<IPropManagerActions>(PropManager);
