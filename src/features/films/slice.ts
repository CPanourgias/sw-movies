import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Film, FilmDetails } from '../../types';

interface FilmsState {
  films: Film[];
  filteredFilms: Film[];
  selectedFilm: Film | null;
  selectedFilmDetails: FilmDetails | null;
  loadingFilmDetails: boolean;
  filmDetailsCache: Record<string, FilmDetails>;
  sortKey: string;
}

const initialState: FilmsState = {
  films: [],
  filteredFilms: [],
  selectedFilm: null,
  selectedFilmDetails: null,
  loadingFilmDetails: false,
  filmDetailsCache: {},
  sortKey: 'releaseDate',
};

export const fetchFilmDetails = createAsyncThunk(
  'films/fetchFilmDetails',
  async (episode_id: number) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=star+wars+episode+${episode_id}`,
    );
    return response.data;
  },
);

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
      state.selectedFilmDetails = null;
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
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilmDetails.pending, (state) => {
      state.loadingFilmDetails = true;
    });
    builder.addCase(fetchFilmDetails.fulfilled, (state, action) => {
      const episode_id = state.selectedFilm?.episode_id ?? 0;
      state.filmDetailsCache[episode_id] = action.payload;
      state.selectedFilmDetails = action.payload;
      state.loadingFilmDetails = false;
    });
    builder.addCase(fetchFilmDetails.rejected, (state) => {
      state.loadingFilmDetails = false;
    });
  },
});

export const { setFilms, filterFilms, selectFilm, sortFilms } =
  filmsSlice.actions;
export default filmsSlice.reducer;
