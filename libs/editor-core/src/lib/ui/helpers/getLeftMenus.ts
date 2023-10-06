import { IManager, IManagerWithUiPlugin } from '@weblancer-ui/types';

export const getLeftMenus = (managers: IManager[]) => {
  const managersWithUiPlugin = [] as IManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.leftMenu)
      managersWithUiPlugin.push(manager as IManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
