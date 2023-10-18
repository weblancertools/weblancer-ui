import 'reflect-metadata';

import { FunctionComponent } from 'react';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { Provider } from 'react-redux';
import { EditorUI } from './editorUI';
import { WeblancerContextProvider } from '@weblancer-ui/editor-core';

export interface EditorCoreProps {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialManagers?: any | any[];
}

export const EditorCore: FunctionComponent<EditorCoreProps> = ({
  store,
  plugins = [],
  initialManagers = [],
}) => {
  const leftMenus = plugins.filter((plugin) => {
    return plugin.leftMenu;
  });

  const middleToolbars = plugins.filter((plugin) => {
    return plugin.middleToolbar;
  });

  const rightMenus = plugins.filter((plugin) => {
    return plugin.rightMenu;
  });

  return (
    <WeblancerContextProvider
      store={store}
      plugins={plugins}
      initialManagers={initialManagers}
    >
      <Provider store={store}>
        <EditorUI
          leftMenus={leftMenus}
          middleToolbars={middleToolbars}
          rightMenus={rightMenus}
        />
      </Provider>
    </WeblancerContextProvider>
  );
};

export default EditorCore;
