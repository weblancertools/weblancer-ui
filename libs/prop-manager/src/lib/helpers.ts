/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IBreakpoint } from '@weblancer-ui/breakpoint-manager';
import { IComponentData } from './types';
import { cloneDeep } from 'lodash';
import { deepAssign } from '@weblancer-ui/utils';

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
  allBreakpoints: IBreakpoint[],
  objectAssign?: boolean
) => {
  if (!componentData.props[name][currentBreakpointId]) {
    // There is no override for this prob data on this breakpoint

    const firstUpperBreakpointOverrideId =
      getFirstUpperBreakpointOverrideInComponentData(
        componentData,
        name,
        currentBreakpointId,
        allBreakpoints
      );

    // Override the prop data for new breakpoint (must be copied with no linking to other breakpoint)
    componentData.props[name][currentBreakpointId] = cloneDeep(
      componentData.props[name][firstUpperBreakpointOverrideId]
    );
  }

  if (objectAssign && componentData.props[name][currentBreakpointId]!.value) {
    deepAssign(componentData.props[name][currentBreakpointId]!.value, newValue);
    componentData.props[name][currentBreakpointId]!.value = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(componentData.props[name][currentBreakpointId]!.value as any),
    };
  } else {
    componentData.props[name][currentBreakpointId]!.value = newValue;
  }
};

export function getFirstUpperBreakpointOverrideInComponentData(
  componentData: IComponentData,
  name: string,
  currentBreakpointId: string,
  allBreakpoints: IBreakpoint[]
) {
  let currentBreakpointFound = false;

  const reversedAllBreakpoints = [...allBreakpoints].reverse();
  for (const breakpoint of reversedAllBreakpoints) {
    if (currentBreakpointFound && componentData.props[name][breakpoint.id]) {
      return breakpoint.id;
    }

    if (breakpoint.id === currentBreakpointId) {
      currentBreakpointFound = true;
      if (componentData.props[name][breakpoint.id]) return breakpoint.id;
    }
  }

  return currentBreakpointId;
}
