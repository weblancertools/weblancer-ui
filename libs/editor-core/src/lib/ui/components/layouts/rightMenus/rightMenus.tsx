import { IManagerWithUiPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface IRightMenusProps {
  managers: IManagerWithUiPlugin[];
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
