import { IEditorUIPlugin } from '@weblancer-ui/types';
import { EmptyPage } from '../adjustments/emptyPage/emptyPage';
import { SectionAdd } from '../adjustments/sectionAdd/sectionAdd';

export const sectionPlugin: IEditorUIPlugin = {
  name: 'Section',
  adjustments: [<EmptyPage />, <SectionAdd />],
};
