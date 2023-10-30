import classNames from 'classnames';
import styles from './categoryItem.module.scss';
import { useComponentDrawerContext } from '../../context/componentDrawerContext';

interface ICategoryItemProps {
  category: string;
}

export const CategoryItem = ({ category }: ICategoryItemProps) => {
  const { setCategory, category: selectedCategory } =
    useComponentDrawerContext();

  const handleClick = () => {
    setCategory(category);
  };

  return (
    <div
      className={classNames(
        styles.root,
        category === selectedCategory && styles.selected
      )}
      onClick={handleClick}
    >
      {category}
    </div>
  );
};
