import classNames from 'classnames';
import styles from './componentItem.module.scss';
import { IComponentHolder, IComponentManagerActions } from '../../../types';
import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { ComponentManager } from '../../../component-manager';

interface IComponentItemProps {
  component: IComponentHolder;
}

export const ComponentItem = ({ component }: IComponentItemProps) => {
  const componentManager =
    useWeblancerEditorManager<IComponentManagerActions>(ComponentManager);

  const handleClick = () => {
    // TODO
    componentManager.createItem(component.key, 'page1', {
      x: 500,
      y: 200,
    });
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
