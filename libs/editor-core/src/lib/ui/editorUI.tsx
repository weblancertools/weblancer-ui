import { FunctionComponent } from 'react';
import { useWeblancerContext } from '../context/weblancerContext';
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
  const plugins = weblancerManager.getPlugins();

  const leftMenus = plugins.filter((plugin) => {
    return plugin.leftMenu;
  });

  const middleToolbars = plugins.filter((plugin) => {
    return plugin.middleToolbar;
  });

  const rightMenus = plugins.filter((plugin) => {
    return plugin.rightMenu;
  });

  return (
    <div className={classNames(layoutStyle.root, styles.root)}>
      <Header />
      <LeftMenus plugins={leftMenus} />
      <MiddleToolbars plugins={middleToolbars} />
      <RightMenus plugins={rightMenus} />
      <ClientView />
    </div>
  );
};
