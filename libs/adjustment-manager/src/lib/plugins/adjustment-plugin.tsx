import { IEditorUIPlugin } from '@weblancer-ui/types';
import { MouseOver } from '../ui/adjustments/mouseOver/mouseOver';
import { Selected } from '../ui/adjustments/selected/selected';
import { MouseOverParentOnDrag } from '../ui/adjustments/mouseOverParentOnDrag/mouseOverParentOnDrag';

export const adjustmentPlugin: IEditorUIPlugin = {
  name: 'Adjustment',
  adjustments: [<MouseOver />, <Selected />, <MouseOverParentOnDrag />],
};
