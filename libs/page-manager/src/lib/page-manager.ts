import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import {
  IPageInfo,
  IPageManagerAction,
  IPageManagerStoreRootState,
  PageManagerService,
} from './types';
import { inject, injectable } from 'inversify';
import pageSlice, {
  addPage,
  removePage,
  setHomePage,
  updatePage,
} from './slice/pageSlice';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { PageLoader } from './pageLoader.ts/pageLoader';
import { DefaultPageLoader } from './pageLoader.ts/defaultPageLoader';
import { IUndoManagerActions, UndoManager } from '@weblancer-ui/undo-manager';
import { importManager } from '@weblancer-ui/utils';

@injectable()
@importManager([StoreManager, PropManager, UndoManager])
export class PageManager
  extends IManagerWithStore
  implements IPageManagerAction
{
  public sliceReducer = pageSlice;
  public name = PageManagerService;

  public pageLoader: PageLoader = new DefaultPageLoader();

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions,
    @inject(PropManager) private readonly propManager: IPropManagerActions,
    @inject(UndoManager) private readonly undoManager: IUndoManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  public static setPageLoader(pageLoader: PageLoader): void {
    const instance =
      Weblancer.getManagerInstance<IPageManagerAction>(PageManager);
    instance.pageLoader = pageLoader;
  }

  addPage(pageInfo: IPageInfo): void {
    this.storeManager.dispatch(addPage({ pageInfo }));
  }

  removePage(pageId: string): void {
    this.storeManager.dispatch(removePage({ pageId }));
  }

  updatePage(pageId: string, pageInfo: Partial<Omit<IPageInfo, 'id'>>): void {
    this.storeManager.dispatch(updatePage({ pageId, pageInfo }));
  }

  setHomePage(pageId: string): void {
    this.storeManager.dispatch(setHomePage({ pageId }));
  }

  async changePage(pageId: string): Promise<void> {
    const pages = this.getPages();
    let componentMap = pages[pageId].componentMap;
    if (!componentMap) {
      const loadedPage = await this.pageLoader.loadPage(pageId);

      componentMap = loadedPage.componentMap;

      this.updatePage(pageId, {
        componentMap: loadedPage.componentMap,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.propManager.setPageData(componentMap!, pageId);

    this.undoManager.clear();
  }

  getPages(): Record<string, IPageInfo> {
    return this.storeManager.getState<IPageManagerStoreRootState>()[
      PageManagerService
    ].pages;
  }

  getHomePage(): IPageInfo {
    let homePageId =
      this.storeManager.getState<IPageManagerStoreRootState>()[
        PageManagerService
      ].homePageId;

    if (!homePageId) {
      homePageId = Object.keys(this.getPages())[0];
    }

    return this.getPages()[homePageId];
  }

  async loadFirstPage(): Promise<void> {
    // TODO load first page by page loader
    // Test
    this.addPage(this.pageLoader.getDefaultPageInfo('page1', 'page1'));
  }

  saveCurrentPage(): void {
    const pageData = this.propManager.getPageData();

    this.updatePage(pageData.id, {
      componentMap: this.propManager.getComponentMap(),
    });
  }
}
