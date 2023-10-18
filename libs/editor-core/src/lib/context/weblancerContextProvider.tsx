import { useCallback, useMemo } from 'react';
import WeblancerContext from './weblancerContext';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

export interface IWeblancerContextProvider {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialManagers?: any | any[];
  children?: JSX.Element;
}

export const WeblancerContextProvider = ({
  store,
  plugins = [],
  initialManagers = [],
  children,
}: IWeblancerContextProvider) => {
  const getManager = useCallback(<TType,>(_class: unknown) => {
    return weblancerRegistry.getManagerInstance<TType>(_class);
  }, []);

  const getPlugins = useCallback(() => {
    return plugins;
  }, [plugins]);

  useMemo(() => {
    weblancerRegistry.setStore(store);

    if (!Array.isArray(initialManagers)) {
      getManager(initialManagers);
      return;
    }

    for (const _c of initialManagers) {
      getManager(_c);
    }
  }, [store, initialManagers, getManager]);

  return (
    <WeblancerContext.Provider value={{ getManager, getPlugins }}>
      {children}
    </WeblancerContext.Provider>
  );
};
