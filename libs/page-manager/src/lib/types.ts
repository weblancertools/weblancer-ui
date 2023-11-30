import { IComponentData } from '@weblancer-ui/types';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { PageLoader } from './pageLoader/pageLoader';

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
  route: string;
  componentMap?: Record<string, IComponentData>;
}

export interface IPageManagerAction {
  pageLoader: PageLoader;
  addPage(pageInfo: IPageInfo): void;
  removePage(pageId: string): void;
  updatePage(pageId: string, pageInfo: Partial<Omit<IPageInfo, 'id'>>): void;
  changePage(pageId: string): Promise<void>;
  changePageSync(pageId: string): void;
  setHomePage(pageId: string): void;
  getPages(): Record<string, IPageInfo>;
  getPageByRoute(route: string): IPageInfo | undefined;
  getPageById(pageId: string): IPageInfo | undefined;
  getHomePage(): IPageInfo;
  setDefaultPage(): void;
  loadPage(route?: string): Promise<IPageInfo | undefined>;
  saveCurrentPage(): void;
}

export const usePageManagerSelector: TypedUseSelectorHook<IPageManagerStoreRootState> =
  useSelector;
