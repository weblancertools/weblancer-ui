import { IEditorUIPlugin } from '@weblancer-ui/types';
import { MouseOver } from '../ui/adjustments/mouseOver/mouseOver';
import { Selected } from '../ui/adjustments/selected/selected';

export const adjustmentPlugin: IEditorUIPlugin = {
  name: 'Adjustment',
  adjustments: [<MouseOver />, <Selected />],
};
