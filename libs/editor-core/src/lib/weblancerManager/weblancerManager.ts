import { configureStore } from '@reduxjs/toolkit';
import { Manager } from './interfaces/Manager';

export class WeblancerManager {
  private managers: Record<string, Manager> = {};
  private initialized = false;

  constructor(
    managers: Manager[],
    public store: ReturnType<typeof configureStore>,
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

  private initManager(manager: Manager) {
    manager.addStore(this.store);
    manager.init(Object.values(this.managers));
  }

  private addManager(manager: Manager) {
    if (this.managers[manager.name])
      console.warn(`Added existing manager named: "${manager.name}"`);

    this.managers[manager.name] = manager;
  }

  public addManagers(managers: Manager[]) {
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
