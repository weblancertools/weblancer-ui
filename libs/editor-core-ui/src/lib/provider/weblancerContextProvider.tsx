/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useCallback, useMemo } from 'react';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { EditorAction } from '@weblancer-ui/undo-manager';
import { WeblancerContext } from '@weblancer-ui/editor-core';
import { Weblancer } from '@weblancer-ui/manager-registry';

export interface IWeblancerContextProvider {
  store: IReduxStore;
  contextType?: 'editor' | 'client';
  plugins?: IEditorUIPlugin[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialManagers?: any | any[];
  children?: ReactNode;
}

export const WeblancerContextProvider = ({
  store,
  plugins = [],
  initialManagers = [],
  children,
}: IWeblancerContextProvider) => {
  const getManager = useCallback(<TType,>(_class: unknown) => {
    return Weblancer.getManagerInstance<TType>(_class);
  }, []);

  const getPlugins = useCallback(() => {
    return plugins;
  }, [plugins]);

  const callEditorAction = useCallback((action: EditorAction) => {
    action.perform();
  }, []);

  useMemo(() => {
    Weblancer.setStore(store);

    if (!Array.isArray(initialManagers)) {
      getManager(initialManagers);
      return;
    }

    for (const _c of initialManagers) {
      getManager(_c);
    }
  }, [store, initialManagers, getManager]);

  const value = useMemo(
    () => ({ callEditorAction, getManager, getPlugins }),
    [getManager, callEditorAction, getPlugins]
  );

  return (
    <WeblancerContext.Provider value={value}>
      {/* TODO Fix this typing issue */}
      {children as any}
    </WeblancerContext.Provider>
  );
};
