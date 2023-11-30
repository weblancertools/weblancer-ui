import { usePropManagerSelector } from '@weblancer-ui/prop-manager';
import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { useEffect, useState } from 'react';

export const useLoadPage2 = (route?: string) => {
  const { pageManager, propManager } = useWeblancerCommonManager();

  const [error, setError] = useState<string>();
  const [notFound, setNotFound] = useState(false);

  const pageId = usePropManagerSelector((state) => state.PropManager.pageId);

  useEffect(() => {
    const pageInfo = route
      ? pageManager.getPageByRoute(route)
      : pageManager.getHomePage();

    if (!pageInfo?.componentMap) {
      const loadPage = async () => {
        try {
          const loadedPage = await pageManager.loadPage(route);

          if (!loadedPage) {
            setNotFound(true);
            return;
          }

          await pageManager.changePage(loadedPage.id);
        } catch (error) {
          setError(JSON.stringify(error));
        }
      };

      loadPage();
    } else {
      pageManager.changePageSync(pageInfo.id);
    }
  }, [route, pageManager, propManager]);

  return {
    page: pageManager.getPageById(pageId),
    notFound,
    error,
  };
};
