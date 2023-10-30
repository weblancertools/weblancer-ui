import { IEditorUIPlugin } from '@weblancer-ui/types';
import { ComponentDrawer } from '../ui/componentDrawer/componentDrawer';

export const componentPlugin: IEditorUIPlugin = {
  name: 'component',
  leftMenu: {
    label: 'component',
    button: <div>component</div>,
  },
  leftDrawer: ComponentDrawer,
};
