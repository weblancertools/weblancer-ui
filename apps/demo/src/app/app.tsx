import '@weblancer-ui/manager-registry';
import { EditorCore } from '@weblancer-ui/editor-core-ui';
import { store } from '../store/store';
import {
  BreakpointManager,
  breakpointUiPlugin,
} from '@weblancer-ui/breakpoint-manager';
import { StateManager } from '@weblancer-ui/state-manager';
import { PropManager } from '@weblancer-ui/prop-manager';
import {
  ComponentManager,
  WeblancerText,
} from '@weblancer-ui/component-manager';

export function App() {
  return (
    <EditorCore
      store={store}
      plugins={[breakpointUiPlugin]}
      initialManagers={[
        BreakpointManager,
        StateManager,
        PropManager,
        ComponentManager,
      ]}
    />
  );
}

export default App;

ComponentManager.register('weblancer-text', 'Text', WeblancerText, [
  'Weblancer',
  'Base Components',
]);
