import { useWeblancerContext } from '../context/weblancerContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useImportWeblancerManager = (_class: any | any[]) => {
  const { weblancerManager } = useWeblancerContext();

  if (!Array.isArray(_class)) {
    weblancerManager.getManager(_class);
    return;
  }

  for (const _c in _class) {
    weblancerManager.getManager(_c);
  }
};
