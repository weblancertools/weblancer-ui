import 'immer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ILocalContextSlice, LocalContextService } from '../types';

const initialState: ILocalContextSlice = {
  initialValues: {},
};

export const localContextSlice = createSlice({
  name: LocalContextService,
  initialState,
  reducers: {
    setInitialValue: (
      state,
      action: PayloadAction<{
        contextKey: string;
        initialValue: unknown;
      }>
    ) => {
      const { contextKey, initialValue } = action.payload;

      state.initialValues[contextKey] = initialValue;
    },
  },
});

export const { setInitialValue } = localContextSlice.actions;

export default localContextSlice.reducer;
