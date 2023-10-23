import { IComponentData } from '../types';

export const removeComponentsRecursively = (
  id: string,
  componentMap: Record<string, IComponentData>
) => {
  const componentData = componentMap[id];
  delete componentMap[id];

  if (componentData.childrenPropData)
    Object.values(componentData.childrenPropData).forEach(({ id }) => {
      removeComponentsRecursively(id, componentMap);
    });
};
