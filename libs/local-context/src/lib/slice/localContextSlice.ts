import 'immer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ILocalContextSlice, LocalContextService } from '../types';

const initialState: ILocalContextSlice = {
  itemContextMap: {},
  initialValues: {},
};

export const localContextSlice = createSlice({
  name: LocalContextService,
  initialState,
  reducers: {
    addContextToItem: (
      state,
      action: PayloadAction<{
        itemId: string;
        contextKey: string;
      }>
    ) => {
      const { contextKey, itemId } = action.payload;
      const itemContextKeys = state.itemContextMap[itemId] ?? [];

      state.itemContextMap[itemId] = [...itemContextKeys, contextKey];
    },
    removeContextFromItem: (
      state,
      action: PayloadAction<{
        itemId: string;
        contextKey: string;
      }>
    ) => {
      const { contextKey, itemId } = action.payload;
      const itemContextKeys = state.itemContextMap[itemId] ?? [];

      state.itemContextMap[itemId] = itemContextKeys.filter(
        (key) => contextKey !== key
      );
    },
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

export const { addContextToItem, removeContextFromItem, setInitialValue } =
  localContextSlice.actions;

export default localContextSlice.reducer;
