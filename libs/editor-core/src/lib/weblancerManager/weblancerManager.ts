import { IManager } from './interfaces/IManager';

export class WeblancerManager {
  private managers: Record<string, IManager> = {};
  private initialized = false;

  constructor(managers: IManager[]) {
    managers.forEach((manager) => {
      this.addManager(manager);
    });

    this.init();
  }

  private addManager(manager: IManager) {
    if (this.managers[manager.name])
      console.warn(`Added existing manager named: "${manager.name}"`);

    this.managers[manager.name] = manager;
  }

  public addManagers(managers: IManager[]) {
    managers.forEach((manager) => {
      this.addManager(manager);
    });

    if (this.initialized) {
      managers.forEach((manager) => {
        manager.init(Object.values(this.managers));
      });
    }
  }

  private init() {
    const allManagers = Object.values(this.managers);

    allManagers.forEach((manager) => {
      manager.init(allManagers);
    });

    this.initialized = true;
  }
}
