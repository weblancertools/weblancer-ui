import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IComponentHolder, IComponentManagerSlice } from '../types';
import { ComponentManagerService } from '../constants';

const initialState: IComponentManagerSlice = {
  componentMap: {},
};

export const stateSlice = createSlice({
  name: ComponentManagerService,
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<IComponentHolder>) => {
      const { key, label, group, component } = action.payload;
      state.componentMap[key] = {
        key,
        label,
        group,
        component,
      };
    },
  },
});

export const { addComponent } = stateSlice.actions;

export default stateSlice.reducer;
