import '@weblancer-ui/manager-registry';
import { EditorCore } from '@weblancer-ui/editor-core-ui';
import { store } from '../store/store';
import {
  importWeblancerComponentKit,
  sectionPlugin,
} from '@weblancer-ui/component-kit';
import { pagePlugin } from '@weblancer-ui/page-manager';
import {
  getWeblancerDefaultPlugins,
  importWeblancerToolKit,
} from '@weblancer-ui/tool-kit';

importWeblancerComponentKit();
importWeblancerToolKit();

export function App() {
  return (
    <EditorCore
      store={store}
      plugins={[...getWeblancerDefaultPlugins(), pagePlugin, sectionPlugin]}
    />
  );
}

export default App;
