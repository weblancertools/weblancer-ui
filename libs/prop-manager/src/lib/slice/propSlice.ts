/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPropManagerSlice } from '../types';
import { PropManagerService } from '../constants';
import {
  removeComponentsRecursively,
  updateComponentDataBasedOnBreakpoints,
} from '../helpers';
import { IBreakpoint } from '@weblancer-ui/breakpoint-manager';
import { IComponentData, IDefaultPropData } from '@weblancer-ui/types';

const initialState: IPropManagerSlice = {
  componentMap: {},
  pageId: '',
};

export const propSlice = createSlice({
  name: PropManagerService,
  initialState,
  reducers: {
    setPageData: (
      state,
      action: PayloadAction<{
        componentMap: Record<string, IComponentData>;
        pageId: string;
      }>
    ) => {
      const { componentMap, pageId } = action.payload;

      state.componentMap = componentMap;
      state.pageId = pageId;
    },
    addComponent: (
      state,
      action: PayloadAction<{
        componentData: IComponentData;
      }>
    ) => {
      const { componentData } = action.payload;
      state.componentMap[componentData.id] = componentData;

      if (componentData.parentId) {
        const parentComponentData = state.componentMap[componentData.parentId];
        if (!parentComponentData) return;

        if (!parentComponentData.children) parentComponentData.children = [];

        parentComponentData.children.push(componentData.id);
      }
    },
    removeComponent: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      const { id } = action.payload;
      const componentData = state.componentMap[id];

      removeComponentsRecursively(id, state.componentMap);

      if (componentData.parentId) {
        const parentComponentData = state.componentMap[componentData.parentId];

        const indexToDelete = parentComponentData.children!.indexOf(
          componentData.id
        );
        parentComponentData.children!.splice(indexToDelete, 1);
      }
    },
    defineComponentProp: (
      state,
      action: PayloadAction<{
        id: string;
        propData: IDefaultPropData;
        biggestBreakpointId: string;
      }>
    ) => {
      const { id, propData, biggestBreakpointId } = action.payload;

      state.componentMap[id].props[propData.name] = {
        [biggestBreakpointId]: {
          name: propData.name,
          typeInfo: propData.typeInfo,
          value: propData.typeInfo.defaultValue,
        },
      };
    },
    updateComponentProp: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
        currentBreakpointId: string;
        allBreakpoints: IBreakpoint[];
      }>
    ) => {
      const { id, name, value, currentBreakpointId, allBreakpoints } =
        action.payload;

      const componentData = state.componentMap[id];

      updateComponentDataBasedOnBreakpoints(
        componentData,
        name,
        value,
        currentBreakpointId,
        allBreakpoints
      );
    },
    deepAssignComponentProp: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
        currentBreakpointId: string;
        allBreakpoints: IBreakpoint[];
      }>
    ) => {
      const { id, name, value, currentBreakpointId, allBreakpoints } =
        action.payload;

      const componentData = state.componentMap[id];

      updateComponentDataBasedOnBreakpoints(
        componentData,
        name,
        value,
        currentBreakpointId,
        allBreakpoints,
        true
      );
    },
    updateComponent: (
      state,
      action: PayloadAction<{
        id: string;
        newData: Partial<
          Pick<IComponentData, 'parentId' | 'name' | 'children'>
        >;
      }>
    ) => {
      const { id, newData } = action.payload;

      const componentData = state.componentMap[id];

      Object.assign(componentData, newData);
    },
  },
});

export const {
  setPageData,
  addComponent,
  removeComponent,
  defineComponentProp,
  updateComponentProp,
  updateComponent,
  deepAssignComponentProp,
} = propSlice.actions;

export default propSlice.reducer;
