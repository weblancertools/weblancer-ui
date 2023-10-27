import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IInspectorManagerSlice, InspectorManagerService } from '../types';
import { DrawerState } from '@weblancer-ui/types';

const initialState: IInspectorManagerSlice = {
  state: 'close',
};

export const stateSlice = createSlice({
  name: InspectorManagerService,
  initialState,
  reducers: {
    setState: (
      state,
      action: PayloadAction<{
        state: DrawerState;
      }>
    ) => {
      state.state = action.payload.state;
    },
  },
});

export const { setState } = stateSlice.actions;

export default stateSlice.reducer;
