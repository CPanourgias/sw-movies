import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { renderHook, waitFor } from '@testing-library/react';
import { filmsApi, useGetFilmsQuery, useGetFilmDetailsQuery } from './api';
import { server } from '../../mocks/server';
import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';

const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmsApi.middleware),
});

setupListeners(store.dispatch);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('filmsApi', () => {
  it('fetches films successfully', async () => {
    const { result } = renderHook(() => useGetFilmsQuery(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.results).toHaveLength(2);
    expect(result.current.data?.results[0].title).toBe('The Phantom Menace');
  });

  it('fetches film details successfully', async () => {
    const { result } = renderHook(() => useGetFilmDetailsQuery(1), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.Title).toBe(
      'Star Wars: Episode I - The Phantom Menace',
    );
  });
});
