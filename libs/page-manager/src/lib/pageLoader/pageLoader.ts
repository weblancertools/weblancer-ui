import { IPageInfo } from '../types';

export abstract class PageLoader {
  public abstract getDefaultPageInfo(id: string, name: string): IPageInfo;
  public abstract loadPage(route: string): Promise<IPageInfo | undefined>;
}
