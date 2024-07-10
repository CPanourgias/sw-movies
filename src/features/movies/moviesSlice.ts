import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchMovies } from './moviesAPI';

interface Movie {
  title: string;
  // Add other character properties as needed
}

interface MoviesState {
  data: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  data: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const selectMovies = (state: RootState) => state.movies.data;
export const selectMoviesLoading = (state: RootState) =>
  state.movies.loading;
export const selectMoviesError = (state: RootState) =>
  state.movies.error;

export default moviesSlice.reducer;
