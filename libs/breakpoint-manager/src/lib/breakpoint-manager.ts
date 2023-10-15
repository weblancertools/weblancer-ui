import { IManager } from '@weblancer-ui/types';
import {
  IBreakpoint,
  IBreakpointManagerActions,
  IStoreRootState,
} from './types';
import { BreakpointManagerService } from './constants';
import { inject } from 'inversify';
import {
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import breakpointSlice, {
  addBreakpoint,
  removeBreakpoint,
  updateBreakpoint,
} from './slice/breakpointSlice';
import { getSortedBreakpoints } from './helpers';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

export class BreakpointManager
  extends IManager
  implements IBreakpointManagerActions
{
  public name: string = BreakpointManagerService;

  constructor(
    @inject(StoreManager) private storeManager: IStoreManagerActions
  ) {
    super();

    this.storeManager.injectSlice(breakpointSlice);
  }
  private getAllBreakpoints() {
    return this.storeManager.getState<IStoreRootState>()[
      BreakpointManagerService
    ].breakpoints;
  }

  getSortedBreakpoints(): IBreakpoint[] {
    return getSortedBreakpoints(this.getAllBreakpoints());
  }

  getCurrentBreakpoint(): IBreakpoint {
    return this.storeManager.getState<IStoreRootState>()[
      BreakpointManagerService
    ].currentBreakpoint;
  }

  addBreakpoint(breakpoint: IBreakpoint): void {
    this.storeManager.dispatch(addBreakpoint(breakpoint));
  }

  removeBreakpoint(id: string): void {
    this.storeManager.dispatch(removeBreakpoint(id));
  }

  updateBreakpoint(breakpoint: IBreakpoint): void {
    this.storeManager.dispatch(updateBreakpoint(breakpoint));
  }
}

weblancerRegistry.registerManager<IBreakpointManagerActions>(BreakpointManager);
