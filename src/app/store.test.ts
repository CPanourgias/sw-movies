import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';

import { filmsApi } from '../features/films/api';
import filmsReducer from '../features/films/slice';
import {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from '../features/films/slice';
import { Film } from '../types';

const films: Film[] = [
  {
    title: 'A New Hope',
    episode_id: 4,
    release_date: '1977-05-25',
    director: 'George Lucas',
    opening_crawl: '',
    producer: '',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: '',
  },
  {
    title: 'The Empire Strikes Back',
    episode_id: 5,
    release_date: '1980-05-21',
    director: 'Irvin Kershner',
    opening_crawl: '',
    producer: '',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: '',
  },
];

describe('Store', () => {
  const store = configureStore({
    reducer: {
      films: filmsReducer,
      [filmsApi.reducerPath]: filmsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filmsApi.middleware),
  });

  it('should handle setting films', () => {
    store.dispatch(setFilms(films));
    const state = store.getState().films;
    expect(state.films).toEqual(films);
    expect(state.filteredFilms).toEqual(films);
  });

  it('should handle filtering films', () => {
    store.dispatch(setFilms(films));
    store.dispatch(filterFilms('hope'));
    const state = store.getState().films;
    expect(state.filteredFilms).toEqual([films[0]]);
  });

  it('should handle selecting a film', () => {
    store.dispatch(selectFilm(films[0]));
    const state = store.getState().films;
    expect(state.selectedFilm).toEqual(films[0]);
  });

  it('should handle sorting films by title', () => {
    store.dispatch(setFilms(films));
    store.dispatch(sortFilms('title'));
    const state = store.getState().films;
    expect(state.filteredFilms[0].title).toBe('A New Hope');
  });
});
