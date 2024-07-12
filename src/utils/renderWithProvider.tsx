import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { RootState, store as appStore } from '../app/store';
import { filmsApi } from '../features/films/api';
import filmsReducer from '../features/films/slice';

interface ExtendedRenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof appStore;
}

export function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        films: filmsReducer,
        [filmsApi.reducerPath]: filmsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(filmsApi.middleware),
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
