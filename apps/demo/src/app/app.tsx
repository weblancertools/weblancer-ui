import '@weblancer-ui/manager-registry';
import { EditorCore } from '@weblancer-ui/editor-core-ui';
import { store } from '../store/store';
import {
  BreakpointManager,
  breakpointUiPlugin,
} from '@weblancer-ui/breakpoint-manager';

export function App() {
  return (
    <EditorCore
      store={store}
      plugins={[breakpointUiPlugin]}
      initialManagers={[BreakpointManager]}
    />
  );
}

export default App;
