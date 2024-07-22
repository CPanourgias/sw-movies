import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Film } from '../../types';

interface FilmsState {
  films: Film[];
  filteredFilms: Film[];
  selectedFilm: Film | null;
  sortKey: string;
}

const initialState: FilmsState = {
  films: [],
  filteredFilms: [],
  selectedFilm: null,
  sortKey: 'releaseDate',
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<Film[]>) {
      state.films = action.payload;
      state.filteredFilms = action.payload;
    },
    filterFilms(state, action: PayloadAction<string>) {
      const query = action.payload.toLowerCase();
      state.filteredFilms = state.films.filter((film) =>
        film.title.toLowerCase().includes(query),
      );
      state.filteredFilms.sort((a, b) => {
        if (state.sortKey === 'title') {
          return a.title.localeCompare(b.title);
        } else if (state.sortKey === 'releaseDate') {
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        }
        return 0;
      });
    },
    selectFilm(state, action: PayloadAction<Film | null>) {
      state.selectedFilm = action.payload;
    },
    sortFilms(state, action: PayloadAction<string>) {
      state.sortKey = action.payload;
      state.filteredFilms.sort((a, b) => {
        if (state.sortKey === 'title') {
          return a.title.localeCompare(b.title);
        } else if (state.sortKey === 'releaseDate') {
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        } else if (state.sortKey === 'episode') {
          return a.episode_id - b.episode_id;
        }
        return 0;
      });
    },
  },
});

export const { setFilms, filterFilms, selectFilm, sortFilms } =
  filmsSlice.actions;
export default filmsSlice.reducer;
