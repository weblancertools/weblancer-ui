import { configureStore } from '@reduxjs/toolkit';

export abstract class Manager {
  abstract name: string;
  public store?: ReturnType<typeof configureStore>;

  public addStore(store: ReturnType<typeof configureStore>) {
    this.store = store;
  }

  abstract init(managers: Manager[]): void;
}
