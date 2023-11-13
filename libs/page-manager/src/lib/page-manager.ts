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
import { inject } from 'inversify';
import pageSlice, {
  addPage,
  removePage,
  setHomePage,
  updatePage,
} from './slice/pageSlice';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

export class PageManager
  extends IManagerWithStore
  implements IPageManagerAction
{
  public sliceReducer = pageSlice;
  public name = PageManagerService;

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions,
    @inject(PropManager) private readonly propManager: IPropManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
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
    if (!pages[pageId].componentMap) {
      // TODO load page data
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.propManager.setPageData(pages[pageId].componentMap!, pageId);
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
    // Test
    this.addPage({
      id: 'page1',
      name: 'page1',
      componentMap: {
        page1: {
          id: 'page1',
          componentKey: 'weblancer-component-kit-page',
          parentId: 'none',
          props: {},
          children: [],
        },
      },
    });
  }

  saveCurrentPage(): void {
    const pageData = this.propManager.getPageData();

    this.updatePage(pageData.id, {
      componentMap: this.propManager.getComponentMap(),
    });
  }
}

weblancerRegistry.registerManager<IPageManagerAction>(PageManager);
