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

    const createItemAction = EditorAction.getActionInstance(
      CreateItemAction
    ).prepare(component.key, parentId, {
      x: 500,
      y: 200,
    });

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
