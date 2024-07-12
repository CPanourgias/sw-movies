// tests/features/films/filmsSelectors.test.ts
import { RootState } from '../../../src/store';
import {
  selectFilmsState,
  selectFilteredFilms,
  selectSelectedFilm,
} from '../../../src/features/films/filmsSelectors';

interface Film {
  id: number;
  title: string;
  releaseDate: string;
  description: string;
  director: string;
}

const filmsData: Film[] = [
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

const state: RootState = {
  films: {
    films: filmsData,
    filteredFilms: filmsData,
    selectedFilm: filmsData[0],
  },
};

describe('filmsSelectors', () => {
  test('selectFilmsState', () => {
    expect(selectFilmsState(state)).toEqual(state.films);
  });

  test('selectFilteredFilms', () => {
    expect(selectFilteredFilms(state)).toEqual(filmsData);
  });

  test('selectSelectedFilm', () => {
    expect(selectSelectedFilm(state)).toEqual(filmsData[0]);
  });
});
