import { IPageInfo } from '../types';
import { PageLoader } from './pageLoader';

export class DefaultPageLoader extends PageLoader {
  public getDefaultPageInfo(id: string, name: string): IPageInfo {
    return {
      id,
      name,
      componentMap: {
        [id]: {
          id,
          name,
          componentKey: 'weblancer-component-kit-page',
          parentId: 'none',
          props: {},
          children: [],
        },
      },
    };
  }

  public async loadPage(pageId: string): Promise<IPageInfo> {
    return {
      id: pageId,
      name: pageId,
      componentMap: {
        page1: {
          id: pageId,
          name: pageId,
          componentKey: 'weblancer-component-kit-page',
          parentId: 'none',
          props: {},
          children: [],
        },
      },
    };
  }
}
