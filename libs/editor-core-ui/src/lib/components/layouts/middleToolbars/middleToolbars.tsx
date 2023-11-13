import { IEditorUIPlugin } from '@weblancer-ui/types';
import { Fragment, FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import styles from './middleToolbars.module.scss';
import classNames from 'classnames';

export interface IMiddleToolbarsProps {
  plugins: IEditorUIPlugin[];
}

export const MiddleToolbars: FunctionComponent<IMiddleToolbarsProps> = ({
  plugins,
}) => {
  return (
    <div className={classNames(layoutStyle.middleToolbars, styles.root)}>
      {plugins.map((plugin) => {
        return <Fragment key={plugin.name}>{plugin.middleToolbar}</Fragment>;
      })}
    </div>
  );
};
