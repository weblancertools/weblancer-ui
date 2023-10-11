import { weblancerContainer } from './container/container';

class WeblancerRegistry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerManager<TActions>(_class: any, name: string) {
    return weblancerContainer.bind<TActions>(name).to(_class);
  }

  public getManagerInstance<TClass>(name: string) {
    return weblancerContainer.get<TClass>(name);
  }
}

export const weblancerRegistry = new WeblancerRegistry();
