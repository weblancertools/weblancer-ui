import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import { IManager, IReduxStore } from '@weblancer-ui/types';

export interface IWeblancerContextProvider extends PropsWithChildren {
  managers: IManager[];
  store: ReturnType<IReduxStore>;
  type: 'editor' | 'client';
}

export const WeblancerContextProvider: FunctionComponent<
  IWeblancerContextProvider
> = ({ type, store, managers, children }) => {
  const { current: weblancerManager } = useRef<WeblancerManager>(
    new WeblancerManager(managers, store, type)
  );

  return (
    <WeblancerContext.Provider value={{ weblancerManager }}>
      {children}
    </WeblancerContext.Provider>
  );
};
