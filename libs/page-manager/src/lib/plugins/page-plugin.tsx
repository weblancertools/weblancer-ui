import { IEditorUIPlugin } from '@weblancer-ui/types';
import { PageController } from '../ui/pageController/pageController';

export const pagePlugin: IEditorUIPlugin = {
  name: 'Page',
  middleToolbar: <PageController />,
};
