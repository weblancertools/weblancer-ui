import { configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IReduxStore<TState = any> = typeof configureStore<TState>;
