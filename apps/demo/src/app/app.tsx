import { EditorCore } from '@weblancer-ui/editor-core';
import { store } from '../store/store';
import { breakpointUiPlugin } from '@weblancer-ui/breakpoint-manager';

export function App() {
  return <EditorCore store={store} plugins={[breakpointUiPlugin]} />;
}

export default App;
