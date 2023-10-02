import { EditorCore } from '@weblancer-ui/editor-core';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export function App() {
  return (
    <Provider store={store}>
      <EditorCore store={store} />
    </Provider>
  );
}

export default App;
