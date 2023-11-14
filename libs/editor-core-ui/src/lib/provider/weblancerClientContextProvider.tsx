/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useMemo } from 'react';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { useFrame } from 'react-frame-component';
import { WeblancerClientContext } from '@weblancer-ui/editor-core';
import {
  ILayoutManagerActions,
  LayoutManager,
} from '@weblancer-ui/layout-manager';

export interface IWeblancerContextClientProviderProps {
  children?: ReactNode;
}

export const WeblancerContextClientProvider: React.FC<
  IWeblancerContextClientProviderProps
> = ({ children }) => {
  const { document: iFrameDocument, window: iFrameWindow } = useFrame();

  const layoutManager =
    Weblancer.getManagerInstance<ILayoutManagerActions>(LayoutManager);

  const value = useMemo(
    () => ({
      document: iFrameDocument ?? document,
      window: iFrameWindow ?? window,
    }),
    [iFrameDocument, iFrameWindow]
  );

  layoutManager.setClientDocument(iFrameDocument);

  return (
    <WeblancerClientContext.Provider value={value}>
      {/* TODO Fix this typing issue */}
      {children as any}
    </WeblancerClientContext.Provider>
  );
};
