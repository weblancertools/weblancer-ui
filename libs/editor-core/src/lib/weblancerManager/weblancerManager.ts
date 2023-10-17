import 'reflect-metadata';

import {
  IEditorUIPlugin,
  IReduxStore,
  WeblancerWindowType,
} from '@weblancer-ui/types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

export class WeblancerManager {
  constructor(
    public store: IReduxStore,
    type: WeblancerWindowType,
    private plugins: IEditorUIPlugin[] = []
  ) {
    weblancerRegistry.setStore(store);
    weblancerRegistry.setWindowType(type);
  }

  public getManager<TType>(_class: unknown) {
    return weblancerRegistry.getManagerInstance<TType>(_class);
  }

  public getPlugins() {
    return this.plugins;
  }
}
