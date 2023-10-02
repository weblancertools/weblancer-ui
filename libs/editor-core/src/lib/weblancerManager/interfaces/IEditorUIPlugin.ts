import { ReactNode } from 'react';

export interface IEditorUIPlugin {
  name: string;

  leftMenu?: {
    label: string;
    icon: ReactNode;
  };
  leftDrawer?: ReactNode;
  leftDialog?: ReactNode;

  rightMenu?: {
    label: string;
    icon: ReactNode;
  };
  rightDrawer?: ReactNode;
  rightDialog?: ReactNode;

  middleToolbar?: ReactNode;
}
