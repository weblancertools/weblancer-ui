import { IEditorUIPlugin } from '@weblancer-ui/types';
import { Resize } from '../ui/resize/resize';

export const extraAdjustmentPlugin: IEditorUIPlugin = {
  name: 'Extra Adjustment',
  adjustments: [<Resize />],
};
