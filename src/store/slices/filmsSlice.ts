import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Film {
  id: number;
  title: string;
  releaseDate: string;
  description: string;
  director: string;
}

interface FilmsState {
  films: Film[];
  filteredFilms: Film[];
  selectedFilm: Film | null;
}

const initialState: FilmsState = {
  films: [],
  filteredFilms: [],
  selectedFilm: null,
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
    },
    selectFilm(state, action: PayloadAction<Film | null>) {
      state.selectedFilm = action.payload;
    },
    sortFilms(state, action: PayloadAction<string>) {
      const sortKey = action.payload;
      state.filteredFilms = [...state.filteredFilms].sort((a, b) => {
        if (sortKey === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortKey === 'releaseDate') {
          return (
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()
          );
        }
        return 0;
      });
    },
  },
});

export const { setFilms, filterFilms, selectFilm, sortFilms } =
  filmsSlice.actions;
export default filmsSlice.reducer;
