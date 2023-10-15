import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';

export interface IWeblancerContextProvider extends PropsWithChildren {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
  type: 'editor' | 'client';
}

export const WeblancerContextProvider: FunctionComponent<
  IWeblancerContextProvider
> = ({ store, plugins = [], children }) => {
  const { current: weblancerManager } = useRef<WeblancerManager>(
    new WeblancerManager(store, plugins)
  );

  return (
    <WeblancerContext.Provider value={{ weblancerManager }}>
      {children}
    </WeblancerContext.Provider>
  );
};
