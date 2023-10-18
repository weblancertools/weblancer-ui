import { createSlice } from '@reduxjs/toolkit';
import { IPropManagerSlice } from '../types';
import { PropManagerService } from '../constants';

const initialState: IPropManagerSlice = {};

export const stateSlice = createSlice({
  name: PropManagerService,
  initialState,
  reducers: {},
});

// export const {} = stateSlice.actions;

export default stateSlice.reducer;
