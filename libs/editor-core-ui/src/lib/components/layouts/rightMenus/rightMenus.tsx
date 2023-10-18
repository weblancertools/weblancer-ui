import { IEditorUIPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface IRightMenusProps {
  plugins: IEditorUIPlugin[];
}

export const RightMenus: FunctionComponent<IRightMenusProps> = ({
  plugins,
}) => {
  return (
    <div className={layoutStyle.rightMenus}>
      Right menus
      {plugins.map((plugin) => {
        return <div key={plugin.name}></div>;
      })}
    </div>
  );
};
