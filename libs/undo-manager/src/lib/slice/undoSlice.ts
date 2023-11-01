import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUndoManagerSlice } from '../types';
import { UndoManagerService } from '../constants';

const initialState: IUndoManagerSlice = {
  hasUndo: false,
  hasRedo: false,
};

export const stateSlice = createSlice({
  name: UndoManagerService,
  initialState,
  reducers: {
    setUndo: (state, action: PayloadAction<boolean>) => {
      state.hasUndo = action.payload;
    },
    setRedo: (state, action: PayloadAction<boolean>) => {
      state.hasRedo = action.payload;
    },
  },
});

export const { setUndo, setRedo } = stateSlice.actions;

export default stateSlice.reducer;
