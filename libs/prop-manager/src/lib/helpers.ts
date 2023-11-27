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

  if (componentData && componentData.children)
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
  ignoreBreakpoint?: boolean,
  objectAssign?: boolean
) => {
  let targetBreakpointId = currentBreakpointId;

  if (ignoreBreakpoint) {
    targetBreakpointId = allBreakpoints[0].id; // use biggest breakpoint
  }

  if (newValue === undefined) {
    delete componentData.props[name][targetBreakpointId];
  }

  if (!componentData.props[name][targetBreakpointId]) {
    // There is no override for this prob data on this breakpoint

    const firstUpperBreakpointOverrideId =
      getFirstUpperBreakpointOverrideInComponentData(
        componentData,
        name,
        targetBreakpointId,
        allBreakpoints
      );

    // Override the prop data for new breakpoint (must be copied with no linking to other breakpoint)
    componentData.props[name][targetBreakpointId] = cloneDeep(
      componentData.props[name][firstUpperBreakpointOverrideId]
    );
  }

  if (
    objectAssign &&
    componentData.props[name][targetBreakpointId]!.value &&
    typeof componentData.props[name][targetBreakpointId]!.value === 'object'
  ) {
    deepAssign(componentData.props[name][targetBreakpointId]!.value, newValue);
    componentData.props[name][targetBreakpointId]!.value = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(componentData.props[name][targetBreakpointId]!.value as any),
    };
  } else {
    componentData.props[name][targetBreakpointId]!.value = newValue;
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
