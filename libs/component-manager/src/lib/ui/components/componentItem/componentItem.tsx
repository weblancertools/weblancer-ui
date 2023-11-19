import classNames from 'classnames';
import styles from './componentItem.module.scss';
import { IComponentManagerActions } from '../../../types';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { EditorAction } from '@weblancer-ui/undo-manager';
import { CreateItemAction } from '../../../actions/CreateItemAction';
import { useComponentDrawerContext } from '../../context/componentDrawerContext';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { ComponentManager } from '../../../component-manager';
import { IComponentHolder } from '@weblancer-ui/types';

interface IComponentItemProps {
  component: IComponentHolder;
}

export const ComponentItem = ({ component }: IComponentItemProps) => {
  const { onClose } = useComponentDrawerContext();

  const adjustmentManager =
    useWeblancerManager<IAdjustmentManagerActions>(AdjustmentManager);
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);
  const componentManager =
    useWeblancerManager<IComponentManagerActions>(ComponentManager);

  const handleClick = () => {
    const selectedItemId = adjustmentManager.getSelectedItemId();

    const parentId =
      selectedItemId &&
      componentManager.getMetadata(selectedItemId)?.isContainer
        ? selectedItemId
        : propManager.getPageData().id;

    const parentRootDiv = adjustmentManager.getItemRootRef(parentId).current;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parentRect = parentRootDiv!.getBoundingClientRect();

    const position = {
      x: parentRect.left,
      y: parentRect.top,
    };

    EditorAction.createAction(CreateItemAction)
      .prepare(component.key, parentId, position)
      .perform();

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
      {component.metadata?.label ?? component.key}
    </div>
  );
};
