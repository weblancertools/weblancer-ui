import {
  Manager,
  ManagerWithUiPlugin,
} from '../../weblancerManager/interfaces/Manager';

export const getMiddleToolbars = (managers: Manager[]) => {
  const managersWithUiPlugin = [] as ManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.middleToolbar)
      managersWithUiPlugin.push(manager as ManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
