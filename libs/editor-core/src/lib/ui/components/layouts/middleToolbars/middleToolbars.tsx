import { ManagerWithUiPlugin } from '@weblancer-ui/types';
import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';

export interface IMiddleToolbarsProps {
  managers: ManagerWithUiPlugin[];
}

export const MiddleToolbars: FunctionComponent<IMiddleToolbarsProps> = ({
  managers,
}) => {
  return (
    <div className={layoutStyle.middleToolbars}>
      Middle toolbars
      {managers.map(({ uiPlugin }) => {
        return <div key={uiPlugin.name}></div>;
      })}
    </div>
  );
};
