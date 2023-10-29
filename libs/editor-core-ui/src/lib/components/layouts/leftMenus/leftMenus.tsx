import { IEditorUIPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import classNames from 'classnames';
import styles from './leftMenus.module.scss';

export interface ILeftMenusProps {
  plugins: IEditorUIPlugin[];
}

export const LeftMenus: FunctionComponent<ILeftMenusProps> = ({ plugins }) => {
  return (
    <div className={classNames(layoutStyle.leftMenus, styles.root)}>
      {plugins.map((plugin) => {
        return (
          <div key={plugin.name} className={styles.menuItem}>
            {plugin.leftMenu?.button}
          </div>
        );
      })}
    </div>
  );
};
