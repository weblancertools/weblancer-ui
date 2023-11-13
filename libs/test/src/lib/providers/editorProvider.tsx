import { Store } from '@reduxjs/toolkit';
import { EditorCore } from '@weblancer-ui/editor-core-ui';
import { configureStore } from '@weblancer-ui/store-manager';
import { getWeblancerDefaultPlugins } from '@weblancer-ui/tool-kit';
import { IEditorUIPlugin } from '@weblancer-ui/types';

export const store = configureStore({
  reducer: {},
});

export function editorProvider(mockStore?: Store, plugins?: IEditorUIPlugin[]) {
  return (
    <EditorCore
      store={mockStore ?? store}
      plugins={plugins ?? [...getWeblancerDefaultPlugins()]}
    />
  );
}
