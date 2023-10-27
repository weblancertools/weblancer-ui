import { IEditorUIPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import styles from './rightMenus.module.scss';
import classNames from 'classnames';

export interface IRightMenusProps {
  plugins: IEditorUIPlugin[];
}

export const RightMenus: FunctionComponent<IRightMenusProps> = ({
  plugins,
}) => {
  return (
    <div className={classNames(layoutStyle.rightMenus, styles.root)}>
      {plugins.map((plugin) => {
        return (
          <div key={plugin.name} className={styles.menuItem}>
            {plugin.rightMenu?.button}
          </div>
        );
      })}
    </div>
  );
};
