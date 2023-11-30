import { IPageInfo } from '../types';
import { PageLoader } from './pageLoader';

export class DefaultPageLoader extends PageLoader {
  public getDefaultPageInfo(id: string, name: string): IPageInfo {
    return {
      id,
      name,
      route: name,
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

  public async loadPage(route: string): Promise<IPageInfo> {
    return {
      id: route,
      name: route,
      route: route,
      componentMap: {
        page1: {
          id: route,
          name: route,
          componentKey: 'weblancer-component-kit-page',
          parentId: 'none',
          props: {},
          children: [],
        },
      },
    };
  }
}
