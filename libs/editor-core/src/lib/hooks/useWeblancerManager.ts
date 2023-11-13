import { Weblancer } from '@weblancer-ui/manager-registry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWeblancerManager = <TActions>(_class: any) => {
  return Weblancer.getManagerInstance<TActions>(_class);
};
