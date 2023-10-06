import { EditorCore } from '@weblancer-ui/editor-core';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { StateManager } from '@weblancer-ui/state-manager';

export function App() {
  return (
    <Provider store={store}>
      <EditorCore store={store} managers={[StateManager.getInstance()]} />
    </Provider>
  );
}

export default App;
