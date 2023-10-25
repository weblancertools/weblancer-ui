import { JSX } from 'react';

export interface IEditorUIPlugin {
  name: string;

  leftMenu?: {
    label: string;
    icon: JSX.Element;
  };
  leftDrawer?: JSX.Element;
  leftDialog?: JSX.Element;

  rightMenu?: {
    label: string;
    icon: JSX.Element;
  };
  rightDrawer?: JSX.Element;
  rightDialog?: JSX.Element;

  middleToolbar?: JSX.Element;

  adjustments?: JSX.Element[];
}
