import { useCallback } from 'react';
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

  return (
    <WeblancerClientContext.Provider value={{ getManager }}>
      {children}
    </WeblancerClientContext.Provider>
  );
};
