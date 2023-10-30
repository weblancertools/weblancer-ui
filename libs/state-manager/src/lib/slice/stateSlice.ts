import 'immer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ITypeInfo } from '@weblancer-ui/types';
import { IStateManagerSlice } from '../types';
import { StateManagerService } from '../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { WritableDraft } from '@reduxjs/toolkit/node_modules/immer/dist/internal';

const initialState: IStateManagerSlice = {};

export const stateSlice = createSlice({
  name: StateManagerService,
  initialState,
  reducers: {
    createOrUpdateState: (
      state,
      action: PayloadAction<{
        key: string;
        typeInfo: ITypeInfo;
        defaultValue?: unknown;
      }>
    ) => {
      state[action.payload.key] = {
        key: action.payload.key,
        typeInfo: action.payload.typeInfo,
        value: action.payload.defaultValue,
      };
    },
    removeState: (
      state,
      action: PayloadAction<{
        key: string;
      }>
    ) => {
      delete state[action.payload.key];
    },
    setState: (
      state,
      action: PayloadAction<{
        key: string;
        value?: unknown;
      }>
    ) => {
      state[action.payload.key].value = action.payload.value;
    },
  },
});

export const { removeState, createOrUpdateState, setState } =
  stateSlice.actions;

export default stateSlice.reducer;
