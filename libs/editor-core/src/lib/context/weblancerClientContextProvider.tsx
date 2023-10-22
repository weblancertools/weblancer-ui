import { PropsWithChildren, useCallback } from 'react';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import WeblancerClientContext from './weblancerClientContext';

export const WeblancerContextClientProvider = ({
  children,
}: PropsWithChildren) => {
  const getManager = useCallback(<TType,>(_class: unknown) => {
    return weblancerRegistry.getManagerInstance<TType>(_class);
  }, []);

  return (
    <WeblancerClientContext.Provider value={{ getManager }}>
      {children}
    </WeblancerClientContext.Provider>
  );
};
