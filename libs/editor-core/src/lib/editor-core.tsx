import { FunctionComponent } from 'react';
import { IManager } from '@weblancer-ui/types';
import { WeblancerContextProvider } from './context/weblancerContextProvider';
import { getDefaultManagers } from './helpers/getDefaultManagers';
import { configureStore } from '@reduxjs/toolkit';
import { EditorUI } from './ui/editorUI';

export interface EditorCoreProps {
  managers?: IManager[];
  store: ReturnType<typeof configureStore>;
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
