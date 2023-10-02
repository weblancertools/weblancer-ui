import { ManagerWithUiPlugin } from '../../../../weblancerManager/interfaces/Manager';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface ILeftMenusProps {
  managers: ManagerWithUiPlugin[];
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
