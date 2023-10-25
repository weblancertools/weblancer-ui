import { IEditorUIPlugin } from '@weblancer-ui/types';
import { MouseOver } from '../ui/adjustments/mouseOver/mouseOver';

export const adjustmentPlugin: IEditorUIPlugin = {
  name: 'Adjustment',
  adjustments: [<MouseOver />],
};
