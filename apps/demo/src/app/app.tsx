import { EditorCore } from '@weblancer-ui/editor-core';
import { store } from '../store/store';

export function App() {
  return <EditorCore store={store} />;
}

export default App;
