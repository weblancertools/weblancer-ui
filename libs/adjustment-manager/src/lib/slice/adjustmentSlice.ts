import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AdjustmentManagerService, IAdjustmentManagerSlice } from '../types';

const initialState: IAdjustmentManagerSlice = {};

export const adjustmentSlice = createSlice({
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

export const { setStateValue } = adjustmentSlice.actions;

export default adjustmentSlice.reducer;
