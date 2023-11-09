import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import styles from './layoutDrawer.module.scss';
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
  TreeItem,
  TreeItemContentProps,
  TreeItemProps,
  useTreeItem,
} from '@mui/x-tree-view';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import { forwardRef } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { IComponentData, IEditorDrawerProps } from '@weblancer-ui/types';

export const LayoutDrawer = ({ onClose }: IEditorDrawerProps) => {
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);
  const adjustmentManager =
    useWeblancerEditorManager<IAdjustmentManagerActions>(AdjustmentManager);

  const pageData: Omit<IComponentData, 'parentId'> = useSelector(
    propManager.getPageDataSelector()
  );

  const handleSelect = (
    event: React.SyntheticEvent<Element, Event>,
    nodeId: string
  ) => {
    adjustmentManager.setSelectedItemId(nodeId);
  };

  return (
    <div className={styles.root}>
      <TreeView
        onNodeSelect={handleSelect}
        multiSelect={false}
        defaultCollapseIcon={'▾'}
        defaultExpandIcon={'▸'}
      >
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
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);
  const children = (componentData.children ?? []).map((childId) => {
    const componentData = propManager.getComponent(childId);
    return (
      <RenderLeaf
        key={childId}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        componentData={componentData!}
      />
    );
  });

  return (
    <CustomTreeItem
      nodeId={componentData.id}
      label={componentData.name ?? componentData.id}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </CustomTreeItem>
  );
};

const CustomTreeItem = forwardRef(function CustomTreeItem(
  props: TreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  return <TreeItem ContentComponent={CustomLeaf} {...props} ref={ref} />;
});

const CustomLeaf = forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classNames(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <span onClick={handleSelectionClick} className={classes.label}>
        {label}
      </span>
    </div>
  );
});
