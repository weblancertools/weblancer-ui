import { EditorCore } from '@weblancer-ui/editor-core';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { StateManager } from '@weblancer-ui/state-manager';
import { CustomManager } from '@weblancer-ui/custom-manager';

export function App() {
  return (
    <Provider store={store}>
      <EditorCore
        store={store}
        managers={[StateManager.getInstance(), CustomManager.getInstance()]}
      />
    </Provider>
  );
}

export default App;
