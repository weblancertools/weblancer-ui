import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import { Manager } from '../weblancerManager/interfaces/IManager';
import { configureStore } from '@reduxjs/toolkit';

export interface IWeblancerContextProvider extends PropsWithChildren {
  managers: Manager[];
  store: ReturnType<typeof configureStore>;
}

export const WeblancerContextProvider: FunctionComponent<
  IWeblancerContextProvider
> = ({ store, managers, children }) => {
  const { current: weblancerManager } = useRef<WeblancerManager>(
    new WeblancerManager(managers, store)
  );

  return (
    <WeblancerContext.Provider value={{ weblancerManager }}>
      {children}
    </WeblancerContext.Provider>
  );
};
