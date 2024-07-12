import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import { filmsApi } from '../features/films/api';
import filmsReducer from '../features/films/slice';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: {
      films: filmsReducer,
      [filmsApi.reducerPath]: filmsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filmsApi.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
