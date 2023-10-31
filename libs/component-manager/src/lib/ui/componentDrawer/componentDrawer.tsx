import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { IComponentManagerActions } from '../../types';
import { ComponentManager } from '../../component-manager';
import styles from './componentDrawer.module.scss';
import {
  ComponentDrawerProvider,
  useComponentDrawerContext,
} from '../context/componentDrawerContext';
import { CategoryItem } from '../components/categoryItem/categoryItem';
import { GroupItem } from '../components/groupItem/groupItem';
import {
  getCategories,
  getComponentsInCategoryAndGroup,
  getGroupsInCategory,
} from './helpers';
import { ComponentItem } from '../components/componentItem/componentItem';
import { IEditorDrawerProps } from '@weblancer-ui/types';

export const ComponentDrawer = ({ onClose }: IEditorDrawerProps) => {
  return (
    <ComponentDrawerProvider onClose={onClose}>
      <ComponentDrawerContainer />
    </ComponentDrawerProvider>
  );
};

const ComponentDrawerContainer = () => {
  const { category, group } = useComponentDrawerContext();

  const componentManager =
    useWeblancerEditorManager<IComponentManagerActions>(ComponentManager);

  const allComponent = componentManager.getAllComponents();

  const categories = getCategories(allComponent);

  const groups = getGroupsInCategory(allComponent, category);

  const components = getComponentsInCategoryAndGroup(
    allComponent,
    category,
    group
  );

  return (
    <div className={styles.root}>
      <div className={styles.categoryCol}>
        {categories.map((category) => (
          <CategoryItem key={category} category={category} />
        ))}
      </div>
      <div className={styles.groupCol}>
        {groups.map((group) => (
          <GroupItem key={group} group={group} />
        ))}
      </div>
      <div className={styles.componentCol}>
        {components.map((component) => (
          <ComponentItem key={component.key} component={component} />
        ))}
      </div>
    </div>
  );
};
