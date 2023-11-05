import classNames from 'classnames';
import styles from './componentItem.module.scss';
import { IComponentHolder } from '../../../types';
import {
  useWeblancerContext,
  useWeblancerEditorManager,
} from '@weblancer-ui/editor-core';
import { EditorAction } from '@weblancer-ui/undo-manager';
import { CreateItemAction } from '../../../actions/CreateItemAction';
import { useComponentDrawerContext } from '../../context/componentDrawerContext';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';

interface IComponentItemProps {
  component: IComponentHolder;
}

export const ComponentItem = ({ component }: IComponentItemProps) => {
  const { callEditorAction } = useWeblancerContext();
  const { onClose } = useComponentDrawerContext();

  const adjustmentManager =
    useWeblancerEditorManager<IAdjustmentManagerActions>(AdjustmentManager);
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const handleClick = () => {
    const selectedItemId = adjustmentManager.getSelectedItemId();
    const componentData = propManager.getComponent(selectedItemId ?? '');

    const parentId = componentData?.metadata?.isContainer
      ? componentData.id
      : propManager.getPageData().id;

    const parentRootDiv = adjustmentManager.getItemRootRef(parentId).current;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parentRect = parentRootDiv!.getBoundingClientRect();

    const position = {
      x: parentRect.left,
      y: parentRect.top,
    };

    const createItemAction = EditorAction.getActionInstance(
      CreateItemAction
    ).prepare(component.key, parentId, position);

    callEditorAction(createItemAction);

    onClose();
  };

  const handleDragStart = () => {
    // TODO
  };

  return (
    <div
      className={classNames(styles.root)}
      onClick={handleClick}
      onDragStart={handleDragStart}
    >
      {component.key}
    </div>
  );
};