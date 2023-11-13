import { EditorCore } from '@weblancer-ui/editor-core-ui';
import {
  configureMockStore,
  configureStore,
} from '@weblancer-ui/store-manager';
import { getWeblancerDefaultPlugins } from '@weblancer-ui/tool-kit';
import { IEditorUIPlugin } from '@weblancer-ui/types';

export function EditorProvider<TStoreRootState>({
  preloadedState,
  plugins,
}: {
  preloadedState?: TStoreRootState;
  plugins?: IEditorUIPlugin[];
}) {
  return (
    <EditorCore
      store={
        preloadedState
          ? configureMockStore(preloadedState)
          : configureStore({
              reducer: {},
            })
      }
      plugins={plugins ?? [...getWeblancerDefaultPlugins()]}
    />
  );
}
