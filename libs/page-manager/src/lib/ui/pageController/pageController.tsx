import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { PageManager } from '../../page-manager';
import {
  IPageManagerAction,
  PageManagerService,
  usePageManagerSelector,
} from '../../types';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { useSelector } from 'react-redux';
import { IComponentData } from '@weblancer-ui/types';
import styles from './pageController.module.scss';
import { generateRandomString } from '@weblancer-ui/utils';

export const PageController = () => {
  const pageManager =
    useWeblancerEditorManager<IPageManagerAction>(PageManager);
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const pages = usePageManagerSelector(
    (state) => state[PageManagerService].pages
  );

  const currentPageData: IComponentData = useSelector(
    propManager.getPageDataSelector()
  );

  const handlePageChange = (pageId: string) => {
    pageManager.saveCurrentPage();

    pageManager.changePage(pageId);
  };

  const createNewPage = () => {
    const id = generateRandomString(8);
    const newPageInfo = pageManager.pageLoader.getDefaultPageInfo(id, id);

    pageManager.saveCurrentPage();

    pageManager.addPage(newPageInfo);
    pageManager.changePage(id);
  };

  return (
    <div className={styles.root}>
      <select
        value={currentPageData?.id ?? ''}
        className={styles.select}
        onChange={(e) => {
          handlePageChange(e.target.value);
        }}
      >
        {Object.values(pages).map((pageInfo) => {
          return (
            <option key={pageInfo.id} value={pageInfo.id}>
              {pageInfo.name}
            </option>
          );
        })}
      </select>

      <button onClick={createNewPage}>Add Page</button>
    </div>
  );
};
