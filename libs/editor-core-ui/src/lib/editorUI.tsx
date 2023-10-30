import layoutStyle from './styles/editorLayout.module.scss';
import styles from './editorUI.module.scss';
import { RightMenus } from './components/layouts/rightMenus/rightMenus';
import { MiddleToolbars } from './components/layouts/middleToolbars/middleToolbars';
import { ClientView } from './components/layouts/clientView/clientView';
import classNames from 'classnames';
import { Header } from './components/layouts/header/header';
import { LeftMenus } from './components/layouts/leftMenus/leftMenus';
import { IEditorUIPlugin } from '@weblancer-ui/types';
import { RightDrawer } from './components/layouts/rightDrawer/rightDrawer';
import { MenuProvider } from './provider/menuContext/menuContext';
import { LeftDrawer } from './components/layouts/leftDrawer/leftDrawer';

interface IEditorUIProps {
  leftMenus: IEditorUIPlugin[];
  middleToolbars: IEditorUIPlugin[];
  rightMenus: IEditorUIPlugin[];
}

export const EditorUI = ({
  leftMenus,
  middleToolbars,
  rightMenus,
}: IEditorUIProps) => {
  return (
    <div className={classNames(layoutStyle.root, styles.root)}>
      <Header />
      <MenuProvider>
        <LeftMenus plugins={leftMenus} />
        <LeftDrawer leftMenus={leftMenus} />
      </MenuProvider>
      <MiddleToolbars plugins={middleToolbars} />
      <MenuProvider>
        <RightMenus plugins={rightMenus} />
        <RightDrawer rightMenus={rightMenus} />
      </MenuProvider>
      <ClientView />
    </div>
  );
};
