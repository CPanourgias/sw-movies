import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Film and FilmDetails interfaces
export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface FilmDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

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

// Create an async thunk for fetching film details
export const fetchFilmDetails = createAsyncThunk(
  'films/fetchFilmDetails',
  async (episode_id: number) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=b9a5e69d&t=star+wars+episode+${episode_id}`,
    );
    return response.data;
  },
);

// Create a slice for films
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
