import { ManagerWithUiPlugin } from '../../../../weblancerManager/interfaces/Manager';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface IRightMenusProps {
  managers: ManagerWithUiPlugin[];
}

export const RightMenus: FunctionComponent<IRightMenusProps> = ({
  managers,
}) => {
  return (
    <div className={layoutStyle.rightMenus}>
      Right menus
      {managers.map(({ uiPlugin }) => {
        return <div key={uiPlugin.name}></div>;
      })}
    </div>
  );
};
