import classNames from 'classnames';
import styles from './componentItem.module.scss';
import { IComponentHolder } from '../../../types';
import { useWeblancerContext } from '@weblancer-ui/editor-core';
import { EditorAction } from '@weblancer-ui/undo-manager';
import { CreateItemAction } from '../../../actions/CreateItemAction';
import { useComponentDrawerContext } from '../../context/componentDrawerContext';

interface IComponentItemProps {
  component: IComponentHolder;
}

export const ComponentItem = ({ component }: IComponentItemProps) => {
  const { callEditorAction } = useWeblancerContext();
  const { onClose } = useComponentDrawerContext();

  const handleClick = () => {
    const createItemAction = EditorAction.getActionInstance(
      CreateItemAction
    ).prepare(component.key, 'page1', {
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
