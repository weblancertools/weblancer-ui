import {
  Manager,
  ManagerWithUiPlugin,
} from '../../weblancerManager/interfaces/Manager';

export const getLeftMenus = (managers: Manager[]) => {
  const managersWithUiPlugin = [] as ManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.leftMenu)
      managersWithUiPlugin.push(manager as ManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
