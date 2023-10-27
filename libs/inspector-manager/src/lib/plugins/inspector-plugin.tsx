import { IEditorUIPlugin } from '@weblancer-ui/types';
import { InspectorMenuButton } from '../ui/inspectorMenuButton/inspectorMenuButton';
import { InspectorDrawer } from '../ui/inspectorDrawer/inspectorDrawer';

export const inspectorPlugin: IEditorUIPlugin = {
  name: 'Inspector',
  rightMenu: {
    label: 'inspector',
    button: <InspectorMenuButton />,
  },
  rightDrawer: InspectorDrawer,
};
