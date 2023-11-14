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
