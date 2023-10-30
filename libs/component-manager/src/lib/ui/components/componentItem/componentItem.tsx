import classNames from 'classnames';
import styles from './componentItem.module.scss';
import { IComponentHolder } from '../../../types';

interface IComponentItemProps {
  component: IComponentHolder;
}

export const ComponentItem = ({ component }: IComponentItemProps) => {
  const handleClick = () => {
    // TODO
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
