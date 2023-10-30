import { IEditorUIPlugin } from '@weblancer-ui/types';
import styles from './rightDrawer.module.scss';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import classNames from 'classnames';
import { useMenuContext } from '../../../provider/menuContext/menuContext';

interface IRightDrawer {
  rightMenus: IEditorUIPlugin[];
}

export const RightDrawer = ({ rightMenus }: IRightDrawer) => {
  const { openMenuName, state } = useMenuContext();

  const OpenDrawer = rightMenus.find(
    (plugin) => plugin.rightDrawer && plugin.name === openMenuName
  )?.rightDrawer;

  return (
    <div
      className={classNames(
        styles.root,
        layoutStyle.rightDrawer,
        state === 'open' && styles.open,
        state === 'pined' && styles.pined,
        state === 'pined' && layoutStyle.pined
      )}
    >
      {OpenDrawer && <OpenDrawer />}
    </div>
  );
};
