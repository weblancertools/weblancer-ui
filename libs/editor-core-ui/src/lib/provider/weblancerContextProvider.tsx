/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useCallback, useMemo } from 'react';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { EditorAction, UndoManager } from '@weblancer-ui/undo-manager';
import { WeblancerContext } from '@weblancer-ui/editor-core';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { BreakpointManager } from '@weblancer-ui/breakpoint-manager';
import { StateManager } from '@weblancer-ui/state-manager';
import { PropManager } from '@weblancer-ui/prop-manager';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { AdjustmentManager } from '@weblancer-ui/adjustment-manager';
import { InspectorManager } from '@weblancer-ui/inspector-manager';
import { LayoutManager } from '@weblancer-ui/layout-manager';

export interface IWeblancerContextProvider {
  store: IReduxStore;
  contextType?: 'editor' | 'client';
  plugins?: IEditorUIPlugin[];
  children?: ReactNode;
}

const requiredManagers = [
  BreakpointManager,
  StateManager,
  PropManager,
  ComponentManager,
  AdjustmentManager,
  InspectorManager,
  LayoutManager,
  ComponentManager,
  UndoManager,
];

export const WeblancerContextProvider = ({
  store,
  plugins = [],
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

    for (const _c of requiredManagers) {
      getManager(_c);
    }
  }, [store, getManager]);

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
