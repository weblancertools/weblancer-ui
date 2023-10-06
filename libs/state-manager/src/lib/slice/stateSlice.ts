import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ITypeInfo } from '@weblancer-ui/types';
import { STATE_MANAGER_NAME } from '../constants';

export interface IStateManagerSlice {
  [key: string]: {
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
    typeInfo: ITypeInfo;
  };
}

const initialState: IStateManagerSlice = {};

export const stateSlice = createSlice({
  name: STATE_MANAGER_NAME,
  initialState,
  reducers: {
    createState: (
      state,
      action: PayloadAction<{
        key: string;
        typeInfo: ITypeInfo;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultValue?: any;
      }>
    ) => {
      state[action.payload.key] = {
        key: action.payload.key,
        typeInfo: action.payload.typeInfo,
        value: action.payload.defaultValue,
      };
    },
    setState: (
      state,
      action: PayloadAction<{
        key: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value?: any;
      }>
    ) => {
      state[action.payload.key].value = action.payload.value;
    },
  },
});

export const { createState, setState } = stateSlice.actions;

export default stateSlice.reducer;
