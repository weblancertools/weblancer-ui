import { useCallback, useMemo } from 'react';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import WeblancerClientContext from './weblancerClientContext';

interface IWeblancerContextClientProviderProps {
  children?: JSX.Element;
}

export const WeblancerContextClientProvider = ({
  children,
}: IWeblancerContextClientProviderProps) => {
  const getManager = useCallback(<TType,>(_class: unknown) => {
    return weblancerRegistry.getManagerInstance<TType>(_class);
  }, []);

  const value = useMemo(() => ({ getManager }), [getManager]);

  return (
    <WeblancerClientContext.Provider value={value}>
      {children}
    </WeblancerClientContext.Provider>
  );
};
