import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { IComponentData } from '@weblancer-ui/types';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useLoadPage = () => {
  const { propManager, pageManager } = useWeblancerCommonManager();

  const pageComponentData: IComponentData = useSelector(
    propManager.getPageDataSelector()
  );

  const loadHomePage = useCallback(async () => {
    pageManager.setDefaultPage();

    const homePageId = pageManager.getHomePage().id;

    await pageManager.changePage(homePageId);
  }, [pageManager]);

  useEffect(() => {
    if (!pageComponentData) {
      loadHomePage();
    }
  }, [pageComponentData, loadHomePage]);

  return pageComponentData;
};
