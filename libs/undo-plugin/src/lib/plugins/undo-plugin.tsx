import { IEditorUIPlugin } from '@weblancer-ui/types';
import { UndoRedoButtons } from '../ui/buttons/undoRedoButtons';

export const undoPlugin: IEditorUIPlugin = {
  name: 'Undo',
  rightMenu: {
    label: 'Undo',
    button: <UndoRedoButtons />,
  },
};
