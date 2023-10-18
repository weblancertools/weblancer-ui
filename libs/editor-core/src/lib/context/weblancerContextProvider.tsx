import { PropsWithChildren, ReactElement, ReactNode, useRef } from 'react';
import WeblancerContext from './weblancerContext';
import { WeblancerManager } from '../weblancerManager/weblancerManager';
import {
  IEditorUIPlugin,
  IReduxStore,
  WeblancerWindowType,
} from '@weblancer-ui/types';

export interface IWeblancerContextProvider {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
  type: WeblancerWindowType;
  children?: JSX.Element;
}

export const WeblancerContextProvider = ({
  store,
  type,
  plugins = [],
  children,
}: IWeblancerContextProvider) => {
  const { current: weblancerManager } = useRef<WeblancerManager>(
    new WeblancerManager(store, type, plugins)
  );

  return (
    <WeblancerContext.Provider value={{ weblancerManager }}>
      {children}
    </WeblancerContext.Provider>
  );
};
