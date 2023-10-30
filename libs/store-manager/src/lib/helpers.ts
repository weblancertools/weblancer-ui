import {
  ConfigureStoreOptions,
  Reducer,
  ReducersMapObject,
  Store,
  combineReducers,
  configureStore as reduxConfigureStore,
} from '@reduxjs/toolkit';
import { InjectableStore } from './types';

export const createReducer = (
  staticReducers: Reducer | ReducersMapObject = {},
  asyncReducers: Reducer | ReducersMapObject = {}
) => {
  return combineReducers({
    ...asyncReducers,
    ...staticReducers,
  });
};

export const configureStore = (options: ConfigureStoreOptions) => {
  const { reducer, ...restOptions } = options;
  const store = reduxConfigureStore({
    reducer: createReducer(reducer),
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

export function makeReadonly<T>(obj: T): Readonly<T> {
  if (Array.isArray(obj)) {
    return Object.freeze(
      obj.map((item) => makeReadonly(item))
    ) as unknown as Readonly<T>;
  } else if (typeof obj === 'object' && obj !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = makeReadonly(obj[key]);
      }
    }
    return Object.freeze(result) as Readonly<T>;
  } else {
    return obj;
  }
}
