import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComponentData, IDefaultPropData, IPropManagerSlice } from '../types';
import { PropManagerService } from '../constants';
import { removeComponentsRecursively } from './helpers';

const initialState: IPropManagerSlice = {
  componentMap: {},
  pageData: {} as IComponentData,
};

export const stateSlice = createSlice({
  name: PropManagerService,
  initialState,
  reducers: {
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
      }>
    ) => {
      const { id, propData } = action.payload;

      state.componentMap[id].props[propData.name] = {
        name: propData.name,
        typeInfo: propData.typeInfo,
        value: propData.typeInfo.defaultValue,
      };
    },
    updateComponentProp: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
      }>
    ) => {
      const { id, name, value } = action.payload;

      state.componentMap[id].props[name].value = value;
    },
  },
});

export const {
  addComponent,
  removeComponent,
  defineComponentProp,
  updateComponentProp,
} = stateSlice.actions;

export default stateSlice.reducer;
