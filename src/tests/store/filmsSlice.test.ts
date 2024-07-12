// tests/store/filmsSlice.test.ts
import filmsReducer, {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from '../../src/store/slices/filmsSlice';

const initialState = {
  films: [],
  filteredFilms: [],
  selectedFilm: null,
};

const films = [
  {
    id: 1,
    title: 'Episode IV - A New Hope',
    releaseDate: '1977-05-25',
    description: 'Description for A New Hope',
    director: 'George Lucas',
  },
  {
    id: 2,
    title: 'Episode V - The Empire Strikes Back',
    releaseDate: '1980-05-17',
    description: 'Description for The Empire Strikes Back',
    director: 'Irvin Kershner',
  },
  {
    id: 3,
    title: 'Episode VI - Return of the Jedi',
    releaseDate: '1983-05-25',
    description: 'Description for Return of the Jedi',
    director: 'Richard Marquand',
  },
];

test('should handle initial state', () => {
  expect(filmsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
});

test('should handle setFilms', () => {
  const actual = filmsReducer(initialState, setFilms(films));
  expect(actual.films).toEqual(films);
  expect(actual.filteredFilms).toEqual(films);
});

test('should handle filterFilms', () => {
  const state = { ...initialState, films, filteredFilms: films };
  const actual = filmsReducer(state, filterFilms('A New Hope'));
  expect(actual.filteredFilms).toEqual([films[0]]);
});

test('should handle selectFilm', () => {
  const actual = filmsReducer(initialState, selectFilm(films[0]));
  expect(actual.selectedFilm).toEqual(films[0]);
});

test('should handle sortFilms by title', () => {
  const state = { ...initialState, films, filteredFilms: films };
  const actual = filmsReducer(state, sortFilms('title'));
  expect(actual.filteredFilms).toEqual([films[2], films[0], films[1]]);
});

test('should handle sortFilms by releaseDate', () => {
  const state = { ...initialState, films, filteredFilms: films };
  const actual = filmsReducer(state, sortFilms('releaseDate'));
  expect(actual.filteredFilms).toEqual([films[0], films[1], films[2]]);
});
