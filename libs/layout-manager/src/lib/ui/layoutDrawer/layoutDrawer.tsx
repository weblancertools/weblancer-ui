import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import styles from './layoutDrawer.module.scss';
import { LayoutManager } from '../../layout-manager';
import { ILayoutManagerActions } from '../../types';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view';
import { IComponentData } from '@weblancer-ui/prop-manager';

export const LayoutDrawer = () => {
  const layoutManager =
    useWeblancerEditorManager<ILayoutManagerActions>(LayoutManager);
  const pageData = layoutManager.getLayout();

  return (
    <div className={styles.root}>
      <TreeView>
        <RenderLeaf componentData={pageData} />
      </TreeView>
    </div>
  );
};

const RenderLeaf = ({
  componentData,
}: {
  componentData: IComponentData | Omit<IComponentData, 'parentId'>;
}) => {
  const children = Object.keys(componentData.childrenPropData ?? {}).map(
    (childId) => {
      return (
        <RenderLeaf
          key={childId}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          componentData={componentData.childrenPropData![childId]}
        />
      );
    }
  );

  return (
    <TreeItem
      nodeId={componentData.id}
      label={componentData.name ?? componentData.id}
    >
      {children}
    </TreeItem>
  );
};
