import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultBreakpoints, getSortedBreakpoints } from '../helpers';
import { IBreakpoint, IBreakpointManagerSlice } from '../types';
import { BreakpointManagerService } from '../constants';

const initialState: IBreakpointManagerSlice = {
  breakpoints: defaultBreakpoints,
  currentBreakpoint: defaultBreakpoints['large'],
};

export const breakpointSlice = createSlice({
  name: BreakpointManagerService,
  initialState,
  reducers: {
    addBreakpoint: (state, action: PayloadAction<IBreakpoint>) => {
      const breakpoint = action.payload;
      state.breakpoints[breakpoint.id] = breakpoint;
    },
    removeBreakpoint: (state, action: PayloadAction<string>) => {
      delete state.breakpoints[action.payload];
    },
    updateBreakpoint: (state, action: PayloadAction<IBreakpoint>) => {
      const breakpoint = action.payload;
      state.breakpoints[breakpoint.id] = breakpoint;
    },
    setCurrentBreakpoint: (state, action: PayloadAction<number>) => {
      const screenSize = action.payload;
      const sortedBreakpoints = getSortedBreakpoints(state.breakpoints);

      for (const breakpoint of sortedBreakpoints) {
        if (breakpoint.bottom < screenSize) {
          state.currentBreakpoint = breakpoint;
          break;
        }
      }
    },
  },
});

export const {
  addBreakpoint,
  removeBreakpoint,
  setCurrentBreakpoint,
  updateBreakpoint,
} = breakpointSlice.actions;

export default breakpointSlice.reducer;
