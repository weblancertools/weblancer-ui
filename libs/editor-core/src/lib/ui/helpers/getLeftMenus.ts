import { Manager, ManagerWithUiPlugin } from '@weblancer-ui/types';

export const getLeftMenus = (managers: Manager[]) => {
  const managersWithUiPlugin = [] as ManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.leftMenu)
      managersWithUiPlugin.push(manager as ManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
