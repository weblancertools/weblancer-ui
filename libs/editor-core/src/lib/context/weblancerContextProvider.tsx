import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import { IManager } from '@weblancer-ui/types';
import { configureStore } from '@reduxjs/toolkit';

export interface IWeblancerContextProvider extends PropsWithChildren {
  managers: IManager[];
  store: ReturnType<typeof configureStore>;
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
