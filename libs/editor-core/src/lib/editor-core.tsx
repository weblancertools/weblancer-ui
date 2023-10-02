import { FunctionComponent, PropsWithChildren } from 'react';
import { Manager } from './weblancerManager/interfaces/IManager';
import { WeblancerContextProvider } from './context/weblancerContextProvider';
import { getDefaultManagers } from './helpers/getDefaultManagers';
import { configureStore } from '@reduxjs/toolkit';

export interface EditorCoreProps extends PropsWithChildren {
  managers?: Manager[];
  store: ReturnType<typeof configureStore>;
}

export const EditorCore: FunctionComponent<EditorCoreProps> = ({
  store,
  managers = [],
  children,
}) => {
  return (
    <WeblancerContextProvider
      store={store}
      managers={[...getDefaultManagers(), ...managers]}
    >
      {children}
    </WeblancerContextProvider>
  );
};

export default EditorCore;
