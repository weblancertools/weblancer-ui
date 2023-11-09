/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IBreakpoint } from '@weblancer-ui/breakpoint-manager';
import { cloneDeep } from 'lodash';
import { IFrameId, deepAssign } from '@weblancer-ui/utils';
import { IComponentData } from '@weblancer-ui/types';

export const removeComponentsRecursively = (
  id: string,
  componentMap: Record<string, IComponentData>
) => {
  const componentData = componentMap[id];
  delete componentMap[id];

  if (componentData.children)
    componentData.children.forEach((childId) => {
      removeComponentsRecursively(childId, componentMap);
    });
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
  if (newValue === undefined) {
    delete componentData.props[name][currentBreakpointId];
  }

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
      if (componentData.props[name]?.[breakpoint.id]) return breakpoint.id;
    }
  }

  return currentBreakpointId;
}

export const getClientIFrameDocument = () => {
  const frameObj = document.getElementById(IFrameId) as HTMLIFrameElement;
  return frameObj.contentWindow!.document;
};
