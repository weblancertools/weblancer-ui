import 'reflect-metadata';

import { FunctionComponent } from 'react';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { Provider } from 'react-redux';
import { EditorUI } from './editorUI';
import { UnitTestProvider } from './provider/UnitTestProvider';

export interface EditorCoreProps {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
}

export const EditorCore: FunctionComponent<EditorCoreProps> = ({
  store,
  plugins = [],
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
    <UnitTestProvider store={store} plugins={plugins}>
      <Provider store={store}>
        <EditorUI
          leftMenus={leftMenus}
          middleToolbars={middleToolbars}
          rightMenus={rightMenus}
        />
      </Provider>
    </UnitTestProvider>
  );
};

export default EditorCore;
