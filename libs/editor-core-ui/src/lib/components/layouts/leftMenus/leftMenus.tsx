import { IEditorUIPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import classNames from 'classnames';
import styles from './leftMenus.module.scss';
import { useMenuContext } from '../../../provider/menuContext/menuContext';

export interface ILeftMenusProps {
  plugins: IEditorUIPlugin[];
}

export const LeftMenus: FunctionComponent<ILeftMenusProps> = ({ plugins }) => {
  const { openMenuName, setOpenMenuName, setState, state } = useMenuContext();

  const handleClick = (pluginName: string) => () => {
    if (openMenuName === pluginName) {
      setOpenMenuName(null);

      switch (state) {
        case 'close':
          setState('open');
          break;
        case 'open':
        case 'pined':
          setState('close');
          break;
      }
    } else {
      setOpenMenuName(pluginName);

      if (state === 'close') setState('open');
    }
  };

  return (
    <div className={classNames(layoutStyle.leftMenus, styles.root)}>
      {plugins.map((plugin) => {
        return (
          <div
            key={plugin.name}
            className={styles.menuItem}
            onClick={handleClick(plugin.name)}
          >
            {plugin.leftMenu?.button}
          </div>
        );
      })}
    </div>
  );
};
