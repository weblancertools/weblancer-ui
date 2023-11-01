import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUndoManagerSlice } from '../types';
import { UndoManagerService } from '../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { WritableDraft } from '@reduxjs/toolkit/node_modules/immer/dist/internal';

const initialState: IUndoManagerSlice = {
  hasUndo: false,
  hasRedo: false,
};

export const undoSlice = createSlice({
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

export const { setUndo, setRedo } = undoSlice.actions;

export default undoSlice.reducer;
