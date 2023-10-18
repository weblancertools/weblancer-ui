import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultBreakpoints, getSortedBreakpoints } from '../helpers';
import { IBreakpoint, IBreakpointManagerSlice } from '../types';
import { BreakpointManagerService } from '../constants';

const initialState: IBreakpointManagerSlice = {
  breakpoints: defaultBreakpoints,
  currentBreakpoint: defaultBreakpoints['large'],
  editor: {
    width: 1001,
  },
};

export const breakpointSlice = createSlice({
  name: BreakpointManagerService,
  initialState,
  reducers: {
    addBreakpoint: (state, action: PayloadAction<IBreakpoint>) => {
      const breakpoint = action.payload;
      state.breakpoints[breakpoint.id] = breakpoint;
    },
    setEditorWidth: (state, action: PayloadAction<number>) => {
      state.editor.width = action.payload;
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
        if (breakpoint.bottom <= screenSize) {
          state.currentBreakpoint = breakpoint;
          state.editor.width = screenSize;
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
  setEditorWidth,
} = breakpointSlice.actions;

export default breakpointSlice.reducer;
