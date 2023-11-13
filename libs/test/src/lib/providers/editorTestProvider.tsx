import 'reflect-metadata';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { WeblancerContext } from '@weblancer-ui/editor-core';
import { Weblancer } from '@weblancer-ui/manager-registry';
import {
  configureMockStore,
  configureStore,
} from '@weblancer-ui/store-manager';
import { IEditorUIPlugin } from '@weblancer-ui/types';
import { PropsWithChildren, ReactNode, useCallback, useMemo } from 'react';
import { Provider } from 'react-redux';

interface IEditorTestProviderProps<TStoreRootState> {
  preloadedState?: TStoreRootState;
  plugins?: IEditorUIPlugin[];
  children?: ReactNode;
  requiredManagers?: any[];
}

export function EditorTestProvider<TStoreRootState = unknown>({
  preloadedState,
  plugins = [],
  children,
  requiredManagers = [],
}: IEditorTestProviderProps<TStoreRootState>) {
  const store = preloadedState
    ? configureMockStore(preloadedState)
    : configureStore({
        reducer: {},
      });

  useMemo(() => {
    Weblancer.setStore(store);

    for (const _c of requiredManagers) {
      Weblancer.registerManager(_c);
      Weblancer.getManagerInstance(_c);
    }
  }, [store, requiredManagers]);

  const getPlugins = useCallback(() => {
    return plugins;
  }, [plugins]);

  const value = useMemo(() => ({ getPlugins }), [getPlugins]);

  return (
    <WeblancerContext.Provider value={value}>
      {/* TODO Fix this typing issue */}
      {(<Provider store={store}>{children}</Provider>) as any}
    </WeblancerContext.Provider>
  );
}

export function getTestWrapper<TStoreRootState = unknown>({
  preloadedState,
  plugins = [],
  requiredManagers = [],
}: IEditorTestProviderProps<TStoreRootState>) {
  return ({ children }: PropsWithChildren) => (
    <EditorTestProvider
      preloadedState={preloadedState}
      plugins={plugins}
      requiredManagers={requiredManagers}
    >
      {children}
    </EditorTestProvider>
  );
}
