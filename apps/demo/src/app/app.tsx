// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EditorCore } from '@weblancer-ui/editor-core';
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      {/* <NxWelcome title="demo" /> */}
      <EditorCore />
    </div>
  );
}

export default App;
