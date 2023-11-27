import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import {
  BreakpointManager,
  IBreakpointManagerActions,
} from '@weblancer-ui/breakpoint-manager';
import {
  ComponentManager,
  IComponentManagerActions,
} from '@weblancer-ui/component-manager';
import {
  ILayoutManagerActions,
  LayoutManager,
} from '@weblancer-ui/layout-manager';
import { ILocalContextAction, LocalContext } from '@weblancer-ui/local-context';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { IPageManagerAction, PageManager } from '@weblancer-ui/page-manager';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import {
  IStateManagerActions,
  StateManager,
} from '@weblancer-ui/state-manager';
import {
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';

export const useWeblancerCommonManager = () => {
  const propManager =
    Weblancer.getManagerInstance<IPropManagerActions>(PropManager);

  const pageManager =
    Weblancer.getManagerInstance<IPageManagerAction>(PageManager);

  const adjustmentManager =
    Weblancer.getManagerInstance<IAdjustmentManagerActions>(AdjustmentManager);

  const breakpointManager =
    Weblancer.getManagerInstance<IBreakpointManagerActions>(BreakpointManager);

  const componentManager =
    Weblancer.getManagerInstance<IComponentManagerActions>(ComponentManager);

  const layoutManager =
    Weblancer.getManagerInstance<ILayoutManagerActions>(LayoutManager);

  const stateManager =
    Weblancer.getManagerInstance<IStateManagerActions>(StateManager);

  const storeManager =
    Weblancer.getManagerInstance<IStoreManagerActions>(StoreManager);

  const localContextManager =
    Weblancer.getManagerInstance<ILocalContextAction>(LocalContext);

  return {
    propManager,
    adjustmentManager,
    breakpointManager,
    componentManager,
    layoutManager,
    stateManager,
    storeManager,
    pageManager,
    localContextManager,
  };
};
