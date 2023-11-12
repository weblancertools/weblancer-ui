import { IEditorUIPlugin } from '@weblancer-ui/types';
import { EmptyPage } from '../adjustments/emptyPage/emptyPage';
import { SectionAdd } from '../adjustments/sectionAdd/sectionAdd';

export const pagePlugin: IEditorUIPlugin = {
  name: 'Page',
  adjustments: [<EmptyPage />, <SectionAdd />],
};
