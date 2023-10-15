import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import { IReduxStore } from '@weblancer-ui/types';

export interface IWeblancerContextProvider extends PropsWithChildren {
  store: IReduxStore;
  type: 'editor' | 'client';
}

export const WeblancerContextProvider: FunctionComponent<
  IWeblancerContextProvider
> = ({ store, children }) => {
  const { current: weblancerManager } = useRef<WeblancerManager>(
    new WeblancerManager(store)
  );

  return (
    <WeblancerContext.Provider value={{ weblancerManager }}>
      {children}
    </WeblancerContext.Provider>
  );
};
