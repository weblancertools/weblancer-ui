import { IEditorUIPlugin } from '@weblancer-ui/types';
import { Fragment, FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface IMiddleToolbarsProps {
  plugins: IEditorUIPlugin[];
}

export const MiddleToolbars: FunctionComponent<IMiddleToolbarsProps> = ({
  plugins,
}) => {
  return (
    <div className={layoutStyle.middleToolbars}>
      {plugins.map((plugin) => {
        return <Fragment key={plugin.name}>{plugin.middleToolbar}</Fragment>;
      })}
    </div>
  );
};
