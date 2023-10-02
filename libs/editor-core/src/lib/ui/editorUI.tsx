import { FunctionComponent, useMemo } from 'react';
import { useWeblancerContext } from '../context/weblancerContext';
import { getLeftMenus } from './helpers/getLeftMenus';
import { getMiddleToolbars } from './helpers/getMiddleToolbars';
import { getRightMenus } from './helpers/getRightMenus';
import layoutStyle from './styles/editorLayout.module.scss';
import styles from './editorUI.module.scss';
import { RightMenus } from './components/layouts/rightMenus/rightMenus';
import { MiddleToolbars } from './components/layouts/middleToolbars/middleToolbars';
import { ClientView } from './components/layouts/clientView/clientView';
import classNames from 'classnames';
import { Header } from './components/layouts/header/header';
import { LeftMenus } from './components/layouts/leftMenus/leftMenus';

export const EditorUI: FunctionComponent = () => {
  const { weblancerManager } = useWeblancerContext();
  const managersCount = weblancerManager.getManagers().length;

  const leftMenus = useMemo(
    () => getLeftMenus(weblancerManager.getManagers()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [managersCount, weblancerManager]
  );

  const middleToolbars = useMemo(
    () => getMiddleToolbars(weblancerManager.getManagers()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [managersCount, weblancerManager]
  );

  const rightMenus = useMemo(
    () => getRightMenus(weblancerManager.getManagers()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [managersCount, weblancerManager]
  );

  return (
    <div className={classNames(layoutStyle.root, styles.root)}>
      <Header />
      <LeftMenus managers={leftMenus} />
      <MiddleToolbars managers={middleToolbars} />
      <RightMenus managers={rightMenus} />
      <ClientView />
    </div>
  );
};
