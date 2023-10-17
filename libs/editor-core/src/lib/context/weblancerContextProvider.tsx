import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import {
  IEditorUIPlugin,
  IReduxStore,
  WeblancerWindowType,
} from '@weblancer-ui/types';

export interface IWeblancerContextProvider extends PropsWithChildren {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
  type: WeblancerWindowType;
}

export const WeblancerContextProvider: FunctionComponent<
  IWeblancerContextProvider
> = ({ store, type, plugins = [], children }) => {
  const { current: weblancerManager } = useRef<WeblancerManager>(
    new WeblancerManager(store, type, plugins)
  );

  return (
    <WeblancerContext.Provider value={{ weblancerManager }}>
      {children}
    </WeblancerContext.Provider>
  );
};
