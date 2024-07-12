// tests/store/index.test.ts
import store from '../../src/store';
import {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from '../../src/store/slices/filmsSlice';

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

test('should dispatch setFilms', () => {
  store.dispatch(setFilms(films));
  const state = store.getState().films;
  expect(state.films).toEqual(films);
  expect(state.filteredFilms).toEqual(films);
});

test('should dispatch filterFilms', () => {
  store.dispatch(filterFilms('A New Hope'));
  const state = store.getState().films;
  expect(state.filteredFilms).toEqual([films[0]]);
});

test('should dispatch selectFilm', () => {
  store.dispatch(selectFilm(films[0]));
  const state = store.getState().films;
  expect(state.selectedFilm).toEqual(films[0]);
});

test('should dispatch sortFilms by title', () => {
  store.dispatch(sortFilms('title'));
  const state = store.getState().films;
  expect(state.filteredFilms).toEqual([films[2], films[0], films[1]]);
});

test('should dispatch sortFilms by releaseDate', () => {
  store.dispatch(sortFilms('releaseDate'));
  const state = store.getState().films;
  expect(state.filteredFilms).toEqual([films[0], films[1], films[2]]);
});
