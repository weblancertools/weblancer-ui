import layoutStyle from './styles/editorLayout.module.scss';
import styles from './editorUI.module.scss';
import { RightMenus } from './components/layouts/rightMenus/rightMenus';
import { MiddleToolbars } from './components/layouts/middleToolbars/middleToolbars';
import { ClientView } from './components/layouts/clientView/clientView';
import classNames from 'classnames';
import { Header } from './components/layouts/header/header';
import { LeftMenus } from './components/layouts/leftMenus/leftMenus';
import { IEditorDrawerProps, IEditorUIPlugin } from '@weblancer-ui/types';
import { RightDrawer } from './components/layouts/rightDrawer/rightDrawer';

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
      <LeftMenus plugins={leftMenus} />
      <MiddleToolbars plugins={middleToolbars} />
      <RightMenus plugins={rightMenus} />
      <RightDrawer rightMenus={rightMenus} />
      <ClientView />
    </div>
  );
};
