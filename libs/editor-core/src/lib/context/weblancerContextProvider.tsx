import React, { FunctionComponent, PropsWithChildren, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import { IManager } from '../weblancerManager/interfaces/IManager';

export interface IWeblancerContextProvider extends PropsWithChildren {
  managers: IManager[];
}

export const WeblancerContextProvider: FunctionComponent<
  IWeblancerContextProvider
> = ({ managers, children }) => {
  const { current: weblancerManager } = useRef<WeblancerManager>(
    new WeblancerManager(managers)
  );

  return (
    <WeblancerContext.Provider value={{ weblancerManager }}>
      {children}
    </WeblancerContext.Provider>
  );
};
