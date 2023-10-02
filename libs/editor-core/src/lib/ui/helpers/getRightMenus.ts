import {
  Manager,
  ManagerWithUiPlugin,
} from '../../weblancerManager/interfaces/Manager';

export const getRightMenus = (managers: Manager[]) => {
  const managersWithUiPlugin = [] as ManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.rightMenu)
      managersWithUiPlugin.push(manager as ManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
