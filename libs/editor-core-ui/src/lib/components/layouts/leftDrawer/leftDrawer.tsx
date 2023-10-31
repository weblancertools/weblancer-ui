import { IEditorUIPlugin } from '@weblancer-ui/types';
import styles from './leftDrawer.module.scss';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import classNames from 'classnames';
import { useMenuContext } from '../../../provider/menuContext/menuContext';

interface ILeftDrawer {
  leftMenus: IEditorUIPlugin[];
}

export const LeftDrawer = ({ leftMenus }: ILeftDrawer) => {
  const { openMenuName, state, setState, setOpenMenuName } = useMenuContext();

  const OpenDrawer = leftMenus.find(
    (plugin) => plugin.leftDrawer && plugin.name === openMenuName
  )?.leftDrawer;

  const handleClose = () => {
    setState('close');
    setOpenMenuName(null);
  };

  return (
    <div
      className={classNames(
        styles.root,
        layoutStyle.leftDrawer,
        state === 'open' && styles.open,
        state === 'pined' && styles.pined,
        state === 'pined' && layoutStyle.pined
      )}
    >
      {OpenDrawer && <OpenDrawer onClose={handleClose} />}
    </div>
  );
};
