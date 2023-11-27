import { ITypeInfo } from '@weblancer-ui/types';
import { ComponentType, PropsWithChildren } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const LocalContextService = 'LocalContext';
export const LocalContextProp = 'localContexts';

export interface ILocalContextSlice {
  initialValues: Record<string, unknown>;
}

export interface ILocalContextRootState {
  [LocalContextService]: ILocalContextSlice;
  [key: string]: unknown;
}

export interface ILocalContextAction {
  addContextToItem(itemId: string, contextKey: string): void;
  removeContextFromItem(itemId: string, contextKey: string): void;
  getItemContextIds(itemId: string): string[];
  getContextByKey<TValue = unknown>(contextKey: string): IContextInfo<TValue>;
  getItemContextInitialValue(itemId: string, contextKey: string): unknown;
  updateItemContextInitialValue(
    itemId: string,
    contextKey: string,
    initialValue: unknown
  ): void;
  register<TValue>(context: IContextInfo<TValue>): void;
}

export interface IContextInfo<TValue = unknown> {
  key: string;
  label: string;
  Provider: ComponentType<IProviderProps<TValue>>;
  defaultValue: TValue;
  typeInfo: ITypeInfo<TValue>;
}

export interface IItemContext<TValue = unknown> {
  contextKey: string;
  initialValue: TValue;
}

export interface IProviderProps<TValue> extends PropsWithChildren {
  initialValue: TValue;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContextMap = Record<string, IContextInfo<any>>;

export type ItemContextMap = Record<string, string[]>;

export const useLocalContextSelector: TypedUseSelectorHook<ILocalContextRootState> =
  useSelector;
