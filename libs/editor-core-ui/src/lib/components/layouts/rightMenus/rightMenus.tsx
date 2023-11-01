import { IEditorUIPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import styles from './rightMenus.module.scss';
import classNames from 'classnames';
import { useMenuContext } from '../../../provider/menuContext/menuContext';

export interface IRightMenusProps {
  plugins: IEditorUIPlugin[];
}

export const RightMenus: FunctionComponent<IRightMenusProps> = ({
  plugins,
}) => {
  const { openMenuName, setOpenMenuName, setState, state } = useMenuContext();

  const handleDrawer = (pluginName: string) => () => {
    if (openMenuName === pluginName) {
      setOpenMenuName(null);
    } else {
      setOpenMenuName(pluginName);
    }

    switch (state) {
      case 'close':
        setState('open');
        break;
      case 'open':
      case 'pined':
        setState('close');
        break;
    }
  };

  return (
    <div className={classNames(layoutStyle.rightMenus, styles.root)}>
      {plugins.map((plugin) => {
        return (
          <div
            key={plugin.name}
            className={styles.menuItem}
            onClick={plugin.rightDrawer && handleDrawer(plugin.name)}
          >
            {plugin.rightMenu?.button}
          </div>
        );
      })}
    </div>
  );
};
