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
  componentPlugin,
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
import { UndoManager } from '@weblancer-ui/undo-manager';
import { undoPlugin } from '@weblancer-ui/undo-plugin';
import { extraAdjustmentPlugin } from '@weblancer-ui/adjustment-plugin';
import { Container, Page, Text } from '@weblancer-ui/component-kit';
import { ResizeSide } from '@weblancer-ui/types';

export function App() {
  return (
    <EditorCore
      store={store}
      plugins={[
        breakpointUiPlugin,
        adjustmentPlugin,
        inspectorPlugin,
        layoutPlugin,
        componentPlugin,
        undoPlugin,
        extraAdjustmentPlugin,
      ]}
      initialManagers={[
        BreakpointManager,
        StateManager,
        PropManager,
        ComponentManager,
        AdjustmentManager,
        InspectorManager,
        LayoutManager,
        ComponentManager,
        UndoManager,
      ]}
    />
  );
}

export default App;

ComponentManager.register('weblancer-text', WeblancerText, {
  groups: 'Texts',
  categories: 'Weblancer',
  label: 'Test-text',
});
ComponentManager.register('weblancer-component-kit-text', Text, {
  groups: 'Texts',
  categories: 'Weblancer',
  label: 'Text',
});
ComponentManager.register('weblancer-component-kit-container', Container, {
  groups: 'Containers',
  categories: 'Weblancer',
  label: 'Container',
  componentMetadata: {
    isContainer: true,
  },
});
ComponentManager.register('weblancer-component-kit-page', Page, {
  groups: 'Containers',
  categories: 'Weblancer',
  label: 'Page',
  componentMetadata: {
    isContainer: true,
    resize: {
      restrictedResizeSides: [
        ResizeSide.E,
        ResizeSide.N,
        ResizeSide.NE,
        ResizeSide.NW,
        ResizeSide.S,
        ResizeSide.SE,
        ResizeSide.SW,
        ResizeSide.W,
      ],
    },
    dragging: {
      restrictedMovementAxises: ['x', 'y'],
    },
  },
});
