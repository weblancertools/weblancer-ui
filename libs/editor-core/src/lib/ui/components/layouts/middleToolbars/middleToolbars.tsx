import { IEditorUIPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface IMiddleToolbarsProps {
  plugins: IEditorUIPlugin[];
}

export const MiddleToolbars: FunctionComponent<IMiddleToolbarsProps> = ({
  plugins,
}) => {
  return (
    <div className={layoutStyle.middleToolbars}>
      Middle toolbars
      {plugins.map((plugin) => {
        return <div key={plugin.name}></div>;
      })}
    </div>
  );
};
