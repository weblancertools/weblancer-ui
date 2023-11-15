import '@weblancer-ui/manager-registry';
import { EditorCore } from '@weblancer-ui/editor-core-ui';
import { store } from '../store/store';
import {
  importWeblancerComponentKit,
  sectionPlugin,
} from '@weblancer-ui/component-kit';
import { pagePlugin } from '@weblancer-ui/page-manager';
import { getWeblancerDefaultPlugins } from '@weblancer-ui/tool-kit';
import {
  LocalContext,
  TestLocalContextProvider,
} from '@weblancer-ui/local-context';
import { PropTypes } from '@weblancer-ui/types';

importWeblancerComponentKit();

export function App() {
  return (
    <EditorCore
      store={store}
      plugins={[...getWeblancerDefaultPlugins(), pagePlugin, sectionPlugin]}
    />
  );
}

export default App;

// Test
LocalContext.register({
  Provider: TestLocalContextProvider,
  key: 'test-context',
  label: 'Test Context',
  defaultValue: {
    test: 'test',
  },
  typeInfo: {
    typeName: PropTypes.Object,
    isRequired: true,
    properties: {
      test: {
        typeName: PropTypes.String,
        defaultValue: 'test',
        isRequired: true,
      },
    },
  },
});
