import 'reflect-metadata';

import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

export class WeblancerManager {
  constructor(
    public store: IReduxStore,
    private plugins: IEditorUIPlugin[] = []
  ) {
    weblancerRegistry.setStore(store);
  }

  public getManager(_class: unknown) {
    return weblancerRegistry.getManagerInstance(_class);
  }

  public getPlugins() {
    return this.plugins;
  }
}
