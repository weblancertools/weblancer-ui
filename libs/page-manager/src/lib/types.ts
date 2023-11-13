import { IComponentData } from '@weblancer-ui/types';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const PageManagerService = 'PageManager';

export interface IPageManagerStoreRootState {
  [PageManagerService]: IPageManagerSlice;
  [key: string]: unknown;
}

export interface IPageManagerSlice {
  pages: Record<string, IPageInfo>;
  homePageId: string;
}

export interface IPageInfo {
  id: string;
  name: string;
  componentMap?: Record<string, IComponentData>;
}

export interface IPageManagerAction {
  addPage(pageInfo: IPageInfo): void;
  removePage(pageId: string): void;
  updatePage(pageId: string, pageInfo: Partial<Omit<IPageInfo, 'id'>>): void;
  changePage(pageId: string): Promise<void>;
  setHomePage(pageId: string): void;
  getPages(): Record<string, IPageInfo>;
  getHomePage(): IPageInfo;
  loadFirstPage(): Promise<void>;
}

export const usePageManagerSelector: TypedUseSelectorHook<IPageManagerStoreRootState> =
  useSelector;
