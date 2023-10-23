import { IBreakpoint } from '@weblancer-ui/breakpoint-manager';
import { IComponentData } from './types';

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

export const addComponentDataToMapRecursively = (
  componentData: IComponentData,
  componentMap: Record<string, IComponentData> = {}
) => {
  componentMap[componentData.id] = componentData;

  if (componentData.childrenPropData)
    Object.values(componentData.childrenPropData).forEach(
      (childComponentData) => {
        addComponentDataToMapRecursively(childComponentData, componentMap);
      }
    );

  return componentMap;
};

export const updateComponentDataBasedOnBreakpoints = (
  componentData: IComponentData,
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newValue: any,
  currentBreakpointId: string,
  allBreakpoints: IBreakpoint[]
) => {
  if (!componentData.props[name][currentBreakpointId]) {
    // There is now override for this prob data on this breakpoint

    const firstUpperBreakpointOverrideId =
      getFirstUpperBreakpointOverrideInComponentData(
        componentData,
        name,
        currentBreakpointId,
        allBreakpoints
      );

    // Override the prop data for new breakpoint
    componentData.props[name][currentBreakpointId] =
      componentData.props[name][firstUpperBreakpointOverrideId];
  }

  componentData.props[name][currentBreakpointId] = newValue;
};

export const getFirstUpperBreakpointOverrideInComponentData = (
  componentData: IComponentData,
  name: string,
  currentBreakpointId: string,
  allBreakpoints: IBreakpoint[]
) => {
  let currentBreakpointFound = false;

  for (const breakpoint of allBreakpoints) {
    if (currentBreakpointFound && componentData.props[name][breakpoint.id]) {
      return breakpoint.id;
    }

    if (breakpoint.id === currentBreakpointId) {
      currentBreakpointFound = true;
    }
  }

  return currentBreakpointId;
};
