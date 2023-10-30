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
import {
  AdjustmentManager,
  adjustmentPlugin,
} from '@weblancer-ui/adjustment-manager';
import {
  InspectorManager,
  inspectorPlugin,
} from '@weblancer-ui/inspector-manager';
import { LayoutManager, layoutPlugin } from '@weblancer-ui/layout-manager';

export function App() {
  return (
    <EditorCore
      store={store}
      plugins={[
        breakpointUiPlugin,
        adjustmentPlugin,
        inspectorPlugin,
        layoutPlugin,
      ]}
      initialManagers={[
        BreakpointManager,
        StateManager,
        PropManager,
        ComponentManager,
        AdjustmentManager,
        InspectorManager,
        LayoutManager,
      ]}
    />
  );
}

export default App;

ComponentManager.register('weblancer-text', WeblancerText);
