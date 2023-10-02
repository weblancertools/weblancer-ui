import { FunctionComponent } from 'react';
import { Manager } from './weblancerManager/interfaces/Manager';
import { WeblancerContextProvider } from './context/weblancerContextProvider';
import { getDefaultManagers } from './helpers/getDefaultManagers';
import { configureStore } from '@reduxjs/toolkit';
import { EditorUI } from './ui/editorUI';

export interface EditorCoreProps {
  managers?: Manager[];
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
    >
      <EditorUI />
    </WeblancerContextProvider>
  );
};

export default EditorCore;
