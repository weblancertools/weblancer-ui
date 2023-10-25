import { useCallback, useMemo } from 'react';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import WeblancerClientContext from './weblancerClientContext';
import { useFrame } from 'react-frame-component';

interface IWeblancerContextClientProviderProps {
  children?: JSX.Element;
}

export const WeblancerContextClientProvider = ({
  children,
}: IWeblancerContextClientProviderProps) => {
  const getManager = useCallback(<TType,>(_class: unknown) => {
    return weblancerRegistry.getManagerInstance<TType>(_class);
  }, []);
  const { document: iFrameDocument, window: iFrameWindow } = useFrame();

  const value = useMemo(
    () => ({
      getManager,
      document: iFrameDocument ?? document,
      window: iFrameWindow ?? window,
    }),
    [getManager, iFrameDocument, iFrameWindow]
  );

  return (
    <WeblancerClientContext.Provider value={value}>
      {children}
    </WeblancerClientContext.Provider>
  );
};
