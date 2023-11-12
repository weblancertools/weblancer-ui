import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPageInfo, IPageManagerSlice, PageManagerService } from '../types';

const initialState: IPageManagerSlice = {
  pages: {},
  homePageId: '',
};

export const pageSlice = createSlice({
  name: PageManagerService,
  initialState,
  reducers: {
    addPage: (state, action: PayloadAction<{ pageInfo: IPageInfo }>) => {
      const pageInfo = action.payload.pageInfo;
      state.pages[pageInfo.id] = pageInfo;
    },
    removePage: (state, action: PayloadAction<{ pageId: string }>) => {
      delete state.pages[action.payload.pageId];
    },
    updatePage: (
      state,
      action: PayloadAction<{
        pageId: string;
        pageInfo: Partial<Omit<IPageInfo, 'id'>>;
      }>
    ) => {
      const { pageId, pageInfo } = action.payload;
      state.pages[pageId] = {
        ...state.pages[pageId],
        ...pageInfo,
      };
    },
    setHomePage: (
      state,
      action: PayloadAction<{
        pageId: string;
      }>
    ) => {
      state.homePageId = action.payload.pageId;
    },
  },
});

export const { addPage, removePage, updatePage, setHomePage } =
  pageSlice.actions;

export default pageSlice.reducer;
