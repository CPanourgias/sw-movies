import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from '../features/films/filmsSlice';
import { filmsApi } from '../features/films/filmsApi';

const store = configureStore({
  reducer: {
    films: filmsReducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
