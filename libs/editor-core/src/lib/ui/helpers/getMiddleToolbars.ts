import { IManager, IManagerWithUiPlugin } from '@weblancer-ui/types';

export const getMiddleToolbars = (managers: IManager[]) => {
  const managersWithUiPlugin = [] as IManagerWithUiPlugin[];

  managers.forEach((manager) => {
    if (manager.uiPlugin && manager.uiPlugin.middleToolbar)
      managersWithUiPlugin.push(manager as IManagerWithUiPlugin);
  });

  return managersWithUiPlugin;
};
