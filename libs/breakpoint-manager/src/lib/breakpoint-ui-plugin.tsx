import { IEditorUIPlugin } from '@weblancer-ui/types';
import { BreakpointController } from './ui/breakpointController';

export const breakpointUiPlugin: IEditorUIPlugin = {
  name: 'Breakpoint',
  middleToolbar: <BreakpointController />,
};
