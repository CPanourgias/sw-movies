// src/features/films/filmsSelectors.ts
import { RootState } from '../../store';

export const selectFilmsState = (state: RootState) => state.films;

export const selectFilteredFilms = (state: RootState) =>
  selectFilmsState(state).filteredFilms;

export const selectSelectedFilm = (state: RootState) =>
  selectFilmsState(state).selectedFilm;

export const selectFilmDetails = (state: RootState) =>
  selectFilmsState(state).selectedFilmDetails;

export const selectLoadingFilmDetails = (state: RootState) =>
  selectFilmsState(state).loadingFilmDetails;
