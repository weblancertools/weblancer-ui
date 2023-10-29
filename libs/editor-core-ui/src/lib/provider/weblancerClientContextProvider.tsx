/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useCallback, useMemo } from 'react';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import { useFrame } from 'react-frame-component';
import { WeblancerClientContext } from '@weblancer-ui/editor-core';

export interface IWeblancerContextClientProviderProps {
  children?: ReactNode;
}

export const WeblancerContextClientProvider: React.FC<
  IWeblancerContextClientProviderProps
> = ({ children }) => {
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
      {/* TODO Fix this typing issue */}
      {children as any}
    </WeblancerClientContext.Provider>
  );
};