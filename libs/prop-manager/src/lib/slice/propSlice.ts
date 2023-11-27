/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPropManagerSlice } from '../types';
import { PropManagerService } from '../constants';
import {
  getFirstUpperBreakpointOverrideInComponentData,
  removeComponentsRecursively,
  updateComponentDataBasedOnBreakpoints,
} from '../helpers';
import { IBreakpoint } from '@weblancer-ui/breakpoint-manager';
import {
  IComponentData,
  IDefaultPropData,
  IPropProviderInfo,
} from '@weblancer-ui/types';
import { cloneDeep } from 'lodash';

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

        if (!parentComponentData) return;

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
        ignoreBreakpoint?: boolean;
      }>
    ) => {
      const {
        id,
        name,
        value,
        currentBreakpointId,
        allBreakpoints,
        ignoreBreakpoint,
      } = action.payload;

      const componentData = state.componentMap[id];

      updateComponentDataBasedOnBreakpoints(
        componentData,
        name,
        value,
        currentBreakpointId,
        allBreakpoints,
        ignoreBreakpoint
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
        ignoreBreakpoint?: boolean;
      }>
    ) => {
      const {
        id,
        name,
        value,
        currentBreakpointId,
        allBreakpoints,
        ignoreBreakpoint,
      } = action.payload;

      const componentData = state.componentMap[id];

      updateComponentDataBasedOnBreakpoints(
        componentData,
        name,
        value,
        currentBreakpointId,
        allBreakpoints,
        ignoreBreakpoint,
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

      state.componentMap[id] = { ...componentData };
    },
    updatePropProviders: (
      state,
      action: PayloadAction<{
        id: string;
        propName: string;
        providerToAdd?: IPropProviderInfo;
        providerToDelete?: string;
        currentBreakpointId: string;
        allBreakpoints: IBreakpoint[];
        ignoreBreakpoint?: boolean;
      }>
    ) => {
      const {
        id,
        propName,
        providerToAdd,
        providerToDelete,
        currentBreakpointId,
        allBreakpoints,
        ignoreBreakpoint,
      } = action.payload;

      const componentData = state.componentMap[id];

      let targetBreakpointId = currentBreakpointId;

      if (ignoreBreakpoint) {
        targetBreakpointId = allBreakpoints[0].id; // use biggest breakpoint
      }

      if (!componentData.props[propName][targetBreakpointId]) {
        // There is no override for this prob data on this breakpoint

        const firstUpperBreakpointOverrideId =
          getFirstUpperBreakpointOverrideInComponentData(
            componentData,
            propName,
            targetBreakpointId,
            allBreakpoints
          );

        // Override the prop data for new breakpoint (must be copied with no linking to other breakpoint)
        componentData.props[propName][targetBreakpointId] = cloneDeep(
          componentData.props[propName][firstUpperBreakpointOverrideId]
        );
      }

      if (!componentData.props[propName][targetBreakpointId]!.providers)
        componentData.props[propName][targetBreakpointId]!.providers = {};

      if (providerToAdd) {
        componentData.props[propName][targetBreakpointId]!.providers![
          providerToAdd.id
        ] = providerToAdd;
      }

      if (providerToDelete) {
        delete componentData.props[propName][targetBreakpointId]!.providers![
          providerToDelete
        ];
      }
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
  updatePropProviders,
} = propSlice.actions;

export default propSlice.reducer;
