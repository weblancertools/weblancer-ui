import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComponentData, IDefaultPropData, IPropManagerSlice } from '../types';
import { PropManagerService } from '../constants';
import {
  addComponentDataToMapRecursively,
  removeComponentsRecursively,
  updateComponentDataBasedOnBreakpoints,
} from '../helpers';
import { IBreakpoint } from '@weblancer-ui/breakpoint-manager';

const initialState: IPropManagerSlice = {
  componentMap: {},
  pageData: {} as IComponentData,
};

export const stateSlice = createSlice({
  name: PropManagerService,
  initialState,
  reducers: {
    setPageData: (
      state,
      action: PayloadAction<{
        pageData: IComponentData;
      }>
    ) => {
      const { pageData } = action.payload;
      const componentMap = addComponentDataToMapRecursively(pageData);

      state.componentMap = componentMap;
      state.pageData = pageData;
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

        if (!parentComponentData.childrenPropData)
          parentComponentData.childrenPropData = {};

        parentComponentData.childrenPropData[componentData.id] = componentData;
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

        parentComponentData.childrenPropData = {};

        delete parentComponentData.childrenPropData[componentData.id];
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
    updateComponent: (
      state,
      action: PayloadAction<{
        id: string;
        newData: Partial<
          Pick<IComponentData, 'parentId' | 'name' | 'childrenPropData'>
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
} = stateSlice.actions;

export default stateSlice.reducer;
