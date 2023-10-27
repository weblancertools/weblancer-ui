import { JSX } from 'react';
import { IEditorDrawerProps } from './IEditorDrawerProps';

export interface IEditorUIPlugin {
  name: string;

  leftMenu?: {
    label: string;
    button: JSX.Element;
  };
  leftDrawer?: React.ComponentType<IEditorDrawerProps>;
  leftDialog?: JSX.Element;

  rightMenu?: {
    label: string;
    button: JSX.Element;
  };
  rightDrawer?: React.ComponentType<IEditorDrawerProps>;
  rightDialog?: JSX.Element;

  middleToolbar?: JSX.Element;

  adjustments?: JSX.Element[];
}
