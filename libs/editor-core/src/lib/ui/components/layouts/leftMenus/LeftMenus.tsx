import { IManagerWithUiPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface ILeftMenusProps {
  managers: IManagerWithUiPlugin[];
}

export const LeftMenus: FunctionComponent<ILeftMenusProps> = ({ managers }) => {
  return (
    <div className={layoutStyle.leftMenus}>
      Left menus
      {managers.map(({ uiPlugin }) => {
        return <div key={uiPlugin.name}></div>;
      })}
    </div>
  );
};
