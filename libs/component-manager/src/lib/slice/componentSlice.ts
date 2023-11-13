import { createSlice } from '@reduxjs/toolkit';
import { IComponentManagerSlice } from '../types';
import { ComponentManagerService } from '../constants';

const initialState: IComponentManagerSlice = {};

export const componentSlice = createSlice({
  name: ComponentManagerService,
  initialState,
  reducers: {},
});

// export const {  } = stateSlice.actions;

export default componentSlice.reducer;