import { ManagerWithUiPlugin } from '../../../../weblancerManager/interfaces/Manager';
import { FunctionComponent } from 'react';

export interface ILeftMenusProps {
  managers: ManagerWithUiPlugin[];
}

export const LeftMenus: FunctionComponent<ILeftMenusProps> = ({ managers }) => {
  return (
    <div>
      {managers.map(({ uiPlugin }) => {
        return <div key={uiPlugin.name}></div>;
      })}
    </div>
  );
};
