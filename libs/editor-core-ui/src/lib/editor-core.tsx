import 'reflect-metadata';

import { FunctionComponent } from 'react';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { Provider } from 'react-redux';
import { EditorUI } from './editorUI';
import { WeblancerContextProvider } from './provider/weblancerContextProvider';

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
    <WeblancerContextProvider store={store} plugins={plugins}>
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
