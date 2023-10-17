import { useWeblancerContext } from '../context/weblancerContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWeblancerManager = <TActions>(_class: any) => {
  const { weblancerManager } = useWeblancerContext();

  return weblancerManager.getManager<TActions>(_class);
};
