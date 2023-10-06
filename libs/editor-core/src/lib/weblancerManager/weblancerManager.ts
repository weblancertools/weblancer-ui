import { IManager, IReduxStore } from '@weblancer-ui/types';

export class WeblancerManager {
  private managers: Record<string, IManager> = {};
  private initialized = false;

  constructor(
    managers: IManager[],
    public store: IReduxStore,
    private type: 'editor' | 'client'
  ) {
    managers.forEach((manager) => {
      this.addManager(manager);
    });

    this.init();
  }

  private init() {
    const allManagers = Object.values(this.managers);

    allManagers.forEach((manager) => {
      this.initManager(manager);
    });

    this.initialized = true;
  }

  private initManager(manager: IManager) {
    manager.addStore(this.store);
    manager.init(Object.values(this.managers));
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
        this.initManager(manager);
      });
    }
  }

  public getManagers() {
    return Object.values(this.managers);
  }

  public isEditor() {
    return this.type === 'editor';
  }

  public isClient() {
    return this.type === 'client';
  }
}
