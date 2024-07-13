import { configureStore } from '@reduxjs/toolkit';
import filmsReducer, {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from './slice';
import { describe, it, expect } from 'vitest';
import { mockFilms } from '../../mocks/mocks';

const store = configureStore({
  reducer: {
    films: filmsReducer,
  },
});

describe('filmsSlice', () => {
  it('should handle initial state', () => {
    expect(store.getState().films).toEqual({
      films: [],
      filteredFilms: [],
      selectedFilm: null,
      selectedFilmDetails: null,
      loadingFilmDetails: false,
      filmDetailsCache: {},
      sortKey: 'releaseDate',
    });
  });

  it('should handle setFilms', () => {
    store.dispatch(setFilms(mockFilms));
    expect(store.getState().films.films).toEqual(mockFilms);
    expect(store.getState().films.filteredFilms).toEqual(mockFilms);
  });

  it('should handle filterFilms', () => {
    store.dispatch(setFilms(mockFilms));
    store.dispatch(filterFilms('Empire'));
    expect(store.getState().films.filteredFilms).toEqual([mockFilms[1]]);
  });

  it('should handle selectFilm', () => {
    store.dispatch(selectFilm(mockFilms[0]));
    expect(store.getState().films.selectedFilm).toEqual(mockFilms[0]);
  });

  it('should handle sortFilms', () => {
    store.dispatch(setFilms(mockFilms));
    store.dispatch(sortFilms('title'));
    expect(store.getState().films.filteredFilms[0].title).toBe('A New Hope');
  });
});
