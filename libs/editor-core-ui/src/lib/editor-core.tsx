import 'reflect-metadata';

import { FunctionComponent } from 'react';
import {
  IEditorUIPlugin,
  IReduxStore,
  WeblancerModuleImportFunction,
} from '@weblancer-ui/types';
import { Provider } from 'react-redux';
import { EditorUI } from './editorUI';
import { WeblancerContextProvider } from './provider/weblancerContextProvider';

export interface EditorCoreProps {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
  toImports?: WeblancerModuleImportFunction[];
}

export const EditorCore: FunctionComponent<EditorCoreProps> = ({
  store,
  plugins = [],
  toImports = [],
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
      toImports={toImports}
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
