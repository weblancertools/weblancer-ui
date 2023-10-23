import { useWeblancerClientContext } from '../context/weblancerClientContext';
import { useWeblancerContext } from '../context/weblancerContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWeblancerManager = <TActions>(_class: any) => {
  const { getManager } = useWeblancerClientContext();

  return getManager<TActions>(_class);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWeblancerEditorManager = <TActions>(_class: any) => {
  const { getManager } = useWeblancerContext();

  return getManager<TActions>(_class);
};
