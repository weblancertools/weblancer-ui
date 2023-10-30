import { IEditorUIPlugin } from '@weblancer-ui/types';
import { LayoutMenuButton } from '../ui/layoutMenuButton/layoutMenuButton';
import { LayoutDrawer } from '../ui/layoutDrawer/layoutDrawer';

export const layoutPlugin: IEditorUIPlugin = {
  name: 'layout',
  leftMenu: {
    label: 'layout',
    button: <LayoutMenuButton />,
  },
  leftDrawer: LayoutDrawer,
};
