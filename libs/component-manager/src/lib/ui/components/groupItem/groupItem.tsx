import classNames from 'classnames';
import styles from './groupItem.module.scss';
import { useComponentDrawerContext } from '../../context/componentDrawerContext';

interface IGroupItemProps {
  group: string;
}

export const GroupItem = ({ group }: IGroupItemProps) => {
  const { setGroup, group: selectedGroup } = useComponentDrawerContext();

  const handleClick = () => {
    setGroup(group);
  };

  return (
    <div
      className={classNames(
        styles.root,
        group === selectedGroup && styles.selected
      )}
      onClick={handleClick}
    >
      {group}
    </div>
  );
};
