import { IReduxSelector, ITypeInfo } from '@weblancer-ui/types';

export const StateManagerService = Symbol('StateManager');

export interface IStateManagerSlice {
  [key: string]: {
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
    typeInfo: ITypeInfo;
  };
}

export interface IStateManagerActions {
  setState(key: string, value?: unknown): void;
  createState(key: string, typeInfo: ITypeInfo, defaultValue?: unknown): void;
  getStateSelector(key: string): ReturnType<IReduxSelector>;
  getAllStates(): IStateManagerSlice;
}
