import { Manager, ManagerWithUiPlugin } from '@weblancer-ui/types';

export const getMiddleToolbars = (managers: Manager[]) => {
  const managersWithUiPlugin = [] as ManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.middleToolbar)
      managersWithUiPlugin.push(manager as ManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
