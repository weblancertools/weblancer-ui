import { FunctionComponent } from 'react';
import { IManager, IReduxStore } from '@weblancer-ui/types';
import { WeblancerContextProvider } from './context/weblancerContextProvider';
import { getDefaultManagers } from './helpers/getDefaultManagers';
import { EditorUI } from './ui/editorUI';

export interface EditorCoreProps {
  managers?: IManager[];
  store: ReturnType<IReduxStore>;
}

export const EditorCore: FunctionComponent<EditorCoreProps> = ({
  store,
  managers = [],
}) => {
  return (
    <WeblancerContextProvider
      store={store}
      managers={[...getDefaultManagers(), ...managers]}
      type="editor"
    >
      <EditorUI />
    </WeblancerContextProvider>
  );
};

export default EditorCore;
