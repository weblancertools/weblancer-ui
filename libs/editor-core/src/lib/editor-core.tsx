import { FunctionComponent } from 'react';
import { IEditorUIPlugin, IReduxStore } from '@weblancer-ui/types';
import { WeblancerContextProvider } from './context/weblancerContextProvider';
import { EditorUI } from './ui/editorUI';
import { Provider } from 'react-redux';

export interface EditorCoreProps {
  store: IReduxStore;
  plugins?: IEditorUIPlugin[];
}

export const EditorCore: FunctionComponent<EditorCoreProps> = ({
  store,
  plugins = [],
}) => {
  return (
    <WeblancerContextProvider store={store} type="editor">
      <Provider store={store}>
        <EditorUI />
      </Provider>
    </WeblancerContextProvider>
  );
};

export default EditorCore;
