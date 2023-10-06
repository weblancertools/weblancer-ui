import { IManager, IManagerWithUiPlugin } from '@weblancer-ui/types';

export const getRightMenus = (managers: IManager[]) => {
  const managersWithUiPlugin = [] as IManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.rightMenu)
      managersWithUiPlugin.push(manager as IManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
