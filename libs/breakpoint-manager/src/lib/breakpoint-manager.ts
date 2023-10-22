import {
  IBreakpoint,
  IBreakpointManagerActions,
  IBreakpointStoreRootState,
} from './types';
import { BreakpointManagerService } from './constants';
import { inject } from 'inversify';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import breakpointSlice, {
  addBreakpoint,
  removeBreakpoint,
  setCurrentBreakpoint,
  updateBreakpoint,
} from './slice/breakpointSlice';
import { getSortedBreakpoints } from './helpers';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

export class BreakpointManager
  extends IManagerWithStore
  implements IBreakpointManagerActions
{
  public sliceReducer = breakpointSlice;
  public name: string = BreakpointManagerService;

  constructor(
    @inject(StoreManager) private storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  private getAllBreakpoints() {
    return this.storeManager.getState<IBreakpointStoreRootState>()[
      BreakpointManagerService
    ].breakpoints;
  }

  setCurrentBreakpoint(width: number): void {
    this.storeManager.dispatch(setCurrentBreakpoint(width));
  }

  getSortedBreakpoints(): IBreakpoint[] {
    return getSortedBreakpoints(this.getAllBreakpoints());
  }

  getCurrentBreakpoint(): IBreakpoint {
    return this.storeManager.getState<IBreakpointStoreRootState>()[
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
