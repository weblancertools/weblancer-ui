import { FunctionComponent, useMemo } from 'react';
import { useWeblancerContext } from '../context/weblancerContext';
import { getLeftMenus } from './helpers/getLeftMenus';
import { getMiddleToolbars } from './helpers/getMiddleToolbars';
import { getRightMenus } from './helpers/getRightMenus';
import { LeftMenus } from './components/layouts/leftMenus/LeftMenus';

export const EditorUI: FunctionComponent = () => {
  const { weblancerManager } = useWeblancerContext();
  const managersCount = weblancerManager.getManagers().length;

  const leftMenus = useMemo(
    () => getLeftMenus(weblancerManager.getManagers()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [managersCount, weblancerManager]
  );

  const middleToolbars = useMemo(
    () => getMiddleToolbars(weblancerManager.getManagers()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [managersCount, weblancerManager]
  );

  const rightMenus = useMemo(
    () => getRightMenus(weblancerManager.getManagers()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [managersCount, weblancerManager]
  );

  return (
    <div>
      <LeftMenus managers={leftMenus} />
    </div>
  );
};
