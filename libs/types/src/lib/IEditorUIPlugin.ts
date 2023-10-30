import { JSX } from 'react';

export interface IEditorUIPlugin {
  name: string;

  leftMenu?: {
    label: string;
    button: JSX.Element;
  };
  leftDrawer?: React.ComponentType;
  leftDialog?: JSX.Element;

  rightMenu?: {
    label: string;
    button: JSX.Element;
  };
  rightDrawer?: React.ComponentType;
  rightDialog?: JSX.Element;

  middleToolbar?: JSX.Element;

  adjustments?: JSX.Element[];
}
