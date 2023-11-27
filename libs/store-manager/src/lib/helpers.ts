import {
  ConfigureStoreOptions,
  Reducer,
  ReducersMapObject,
  Store,
  combineReducers,
  createSlice,
  configureStore as reduxConfigureStore,
} from '@reduxjs/toolkit';
import { InjectableStore } from './types';
import { EqualityFn } from 'react-redux';
import { freeze } from 'immer';

export const createReducer = (
  staticReducers: Reducer | ReducersMapObject = {},
  asyncReducers: Reducer | ReducersMapObject = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preloadedState: any = {}
) => {
  return combineReducers({
    ...asyncReducers,
    ...staticReducers,
    preloadedState,
  });
};

export const configureStore = (options: ConfigureStoreOptions) => {
  const { reducer, ...restOptions } = options;

  let _reducer = reducer;
  // No reducer detected
  if (Object.keys(_reducer).length === 0) {
    _reducer = {
      empty: createSlice({ name: 'empty', initialState: {}, reducers: {} })
        .reducer,
    };
  }

  const store = reduxConfigureStore({
    reducer: createReducer(_reducer),
    ...restOptions,
  }) as Store & InjectableStore;

  store.asyncReducers = {};
  store.injectReducer = (key: string, reducer: Reducer) => {
    if (store.asyncReducers[key])
      throw new Error(`Injecting 2 sliceReducer with same name: ${key}`);

    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };

  return store as Store;
};

export const configureMockStore = <TRootState>(preloadedState: TRootState) => {
  const store = reduxConfigureStore({
    reducer: createReducer({}),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preloadedState: preloadedState as any,
  }) as Store & InjectableStore;

  store.asyncReducers = {};
  store.injectReducer = (key: string, reducer: Reducer) => {
    if (store.asyncReducers[key])
      throw new Error(`Injecting 2 sliceReducer with same name: ${key}`);

    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };

  return store as Store;
};

export function storeListener<TState = unknown, Selected = unknown>(
  store: Store,
  selector: (state: TState) => Selected,
  callback: (selected: Selected) => void,
  options: {
    equalityFn?: EqualityFn<Selected> | undefined;
    callImmediately?: boolean;
  } = {}
) {
  const { equalityFn, callImmediately } = options;

  let previousSelected: Selected = selector(store.getState());

  const handleChange = () => {
    const selected = selector(store.getState());
    if (selected !== previousSelected) {
      callback(freeze(selected));
      previousSelected = selected;
      return;
    }

    if (equalityFn && !equalityFn(selected, previousSelected)) {
      callback(freeze(selected));
      previousSelected = selected;
    }
  };

  const unsubscribe = store.subscribe(handleChange);

  if (callImmediately) callback(freeze(previousSelected));

  return unsubscribe;
}
