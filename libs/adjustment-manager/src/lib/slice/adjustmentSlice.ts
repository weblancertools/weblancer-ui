import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AdjustmentManagerService, IAdjustmentManagerSlice } from '../types';

const initialState: IAdjustmentManagerSlice = {};

export const stateSlice = createSlice({
  name: AdjustmentManagerService,
  initialState,
  reducers: {
    setStateValue: (
      state,
      action: PayloadAction<{
        key: keyof IAdjustmentManagerSlice;
        value: string | null;
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setStateValue } = stateSlice.actions;

export default stateSlice.reducer;
