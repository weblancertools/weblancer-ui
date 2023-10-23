import { useWeblancerClientContext } from '../context/weblancerClientContext';
import { useWeblancerContext } from '../context/weblancerContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWeblancerManager = <TActions>(_class: any) => {
  console.log('useWeblancerManager1', _class);
  const { getManager } = useWeblancerClientContext();

  console.log('useWeblancerManager2', _class);
  return getManager<TActions>(_class);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWeblancerEditorManager = <TActions>(_class: any) => {
  const { getManager } = useWeblancerContext();

  return getManager<TActions>(_class);
};
