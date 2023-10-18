import { IEditorUIPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface ILeftMenusProps {
  plugins: IEditorUIPlugin[];
}

export const LeftMenus: FunctionComponent<ILeftMenusProps> = ({ plugins }) => {
  return (
    <div className={layoutStyle.leftMenus}>
      Left menus
      {plugins.map((plugin) => {
        return <div key={plugin.name}></div>;
      })}
    </div>
  );
};
