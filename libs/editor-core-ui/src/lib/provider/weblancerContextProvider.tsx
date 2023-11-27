/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useCallback, useMemo } from 'react';
import {
  IEditorUIPlugin,
  IReduxStore,
  WeblancerModuleImportFunction,
} from '@weblancer-ui/types';
import { UndoManager } from '@weblancer-ui/undo-manager';
import { WeblancerContext } from '@weblancer-ui/editor-core';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { BreakpointManager } from '@weblancer-ui/breakpoint-manager';
import { StateManager } from '@weblancer-ui/state-manager';
import { PropManager } from '@weblancer-ui/prop-manager';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { AdjustmentManager } from '@weblancer-ui/adjustment-manager';
import { InspectorManager } from '@weblancer-ui/inspector-manager';
import { LayoutManager } from '@weblancer-ui/layout-manager';
import { PageManager } from '@weblancer-ui/page-manager';
import { LocalContext } from '@weblancer-ui/local-context';
import { useImportModules } from '../hooks/useImportModules';

export interface IWeblancerContextProvider {
  store: IReduxStore;
  contextType?: 'editor' | 'client';
  plugins?: IEditorUIPlugin[];
  children?: ReactNode;
  toImports: WeblancerModuleImportFunction[];
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
  PageManager,
  LocalContext,
];

export const WeblancerContextProvider = ({
  store,
  plugins = [],
  children,
  toImports,
}: IWeblancerContextProvider) => {
  const getPlugins = useCallback(() => {
    return plugins;
  }, [plugins]);

  useMemo(() => {
    Weblancer.setStore(store);

    for (const _c of requiredManagers) {
      Weblancer.registerManager(_c);
      Weblancer.getManagerInstance(_c);
    }
  }, [store]);

  const { loading } = useImportModules(toImports);

  const value = useMemo(() => ({ getPlugins }), [getPlugins]);

  if (loading) {
    // TODO show loading when importing modules
    return <div>Loading</div>;
  }

  return (
    <WeblancerContext.Provider value={value}>
      {/* TODO Fix this typing issue */}
      {children as any}
    </WeblancerContext.Provider>
  );
};
