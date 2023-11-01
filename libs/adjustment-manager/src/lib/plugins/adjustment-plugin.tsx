import { IEditorUIPlugin } from '@weblancer-ui/types';
import { MouseOver } from '../ui/adjustments/mouseOver/mouseOver';
import { Selected } from '../ui/adjustments/selected/selected';
import { Resize } from '../ui/adjustments/resize/resize';

export const adjustmentPlugin: IEditorUIPlugin = {
  name: 'Adjustment',
  adjustments: [<MouseOver />, <Selected />, <Resize />],
};
