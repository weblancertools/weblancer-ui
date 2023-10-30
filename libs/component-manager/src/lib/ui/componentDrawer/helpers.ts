import { IComponentMap } from '../../types';

export function getCategories(allComponent: IComponentMap) {
  return Object.values(allComponent).flatMap((componentHolder) => {
    return componentHolder.metadata?.categories ?? [];
  });
}

export function getGroupsInCategory(
  allComponent: IComponentMap,
  category: string | null
) {
  if (!category) return [];

  return Object.values(allComponent)
    .filter((componentHolder) => {
      const categories = componentHolder.metadata?.categories;
      if (!categories) {
        return false;
      } else if (Array.isArray(categories)) {
        return categories.includes(category || 'none');
      } else {
        return categories === category;
      }
    })
    .flatMap((componentHolder) => {
      return componentHolder.metadata?.groups ?? [];
    });
}

export function getComponentsInCategoryAndGroup(
  allComponent: IComponentMap,
  category: string | null,
  group: string | null
) {
  if (!category || !group) return [];

  return Object.values(allComponent)
    .filter((componentHolder) => {
      const categories = componentHolder.metadata?.categories;
      if (!categories) {
        return false;
      } else if (Array.isArray(categories)) {
        return categories.includes(category || 'none');
      } else {
        return categories === category;
      }
    })
    .filter((componentHolder) => {
      const groups = componentHolder.metadata?.groups;
      if (!groups) {
        return false;
      } else if (Array.isArray(groups)) {
        return groups.includes(group || 'none');
      } else {
        return groups === group;
      }
    })
    .flatMap((componentHolder) => {
      return componentHolder;
    });
}
