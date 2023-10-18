import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { BreakpointManagerService } from './constants';

export interface IBreakpointStoreRootState {
  [BreakpointManagerService]: IBreakpointManagerSlice;
  [key: string]: unknown;
}

export interface IBreakpoint {
  id: string;
  bottom: number;
}

export interface IBreakpointManagerSlice {
  breakpoints: Record<string, IBreakpoint>;
  currentBreakpoint: IBreakpoint;
  editor: {
    width: number;
  };
}

export interface IBreakpointManagerActions {
  addBreakpoint(breakpoint: IBreakpoint): void;
  removeBreakpoint(id: string): void;
  updateBreakpoint(breakpoint: IBreakpoint): void;
  getSortedBreakpoints(): IBreakpoint[];
  getCurrentBreakpoint(): IBreakpoint;
  setCurrentBreakpoint(width: number): void;
}

export const useBreakpointManagerSelector: TypedUseSelectorHook<IBreakpointStoreRootState> =
  useSelector;
