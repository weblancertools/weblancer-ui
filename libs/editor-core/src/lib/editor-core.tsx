import { PropsWithChildren } from 'react';
import { IManager } from './weblancerManager/interfaces/IManager';
import { WeblancerContextProvider } from './context/weblancerContextProvider';
import { getDefaultManagers } from './helpers/getDefaultManagers';

export interface EditorCoreProps extends PropsWithChildren {
  managers?: IManager[];
}

export function EditorCore({ managers = [], children }: EditorCoreProps) {
  return (
    <WeblancerContextProvider managers={[...getDefaultManagers(), ...managers]}>
      {children}
    </WeblancerContextProvider>
  );
}

export default EditorCore;
