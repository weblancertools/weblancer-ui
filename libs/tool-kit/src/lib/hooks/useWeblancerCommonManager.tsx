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
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
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
    weblancerRegistry.getManagerInstance<IPropManagerActions>(PropManager);

  const adjustmentManager =
    weblancerRegistry.getManagerInstance<IAdjustmentManagerActions>(
      AdjustmentManager
    );

  const breakpointManager =
    weblancerRegistry.getManagerInstance<IBreakpointManagerActions>(
      BreakpointManager
    );

  const componentManager =
    weblancerRegistry.getManagerInstance<IComponentManagerActions>(
      ComponentManager
    );

  const layoutManager =
    weblancerRegistry.getManagerInstance<ILayoutManagerActions>(LayoutManager);

  const stateManager =
    weblancerRegistry.getManagerInstance<IStateManagerActions>(StateManager);

  const storeManager =
    weblancerRegistry.getManagerInstance<IStoreManagerActions>(StoreManager);

  return {
    propManager,
    adjustmentManager,
    breakpointManager,
    componentManager,
    layoutManager,
    stateManager,
    storeManager,
  };
};
