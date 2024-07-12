// tests/features/films/filmsSlice.test.ts
import filmsReducer, { setFilms, filterFilms, selectFilm, sortFilms } from '../../../src/features/films/filmsSlice';
import { Film } from '../../../src/features/films/filmsApi';

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

const filmsData: Film[] = [
  { 
    title: 'Episode IV - A New Hope', 
    episode_id: 1, 
    opening_crawl: '...', 
    director: 'George Lucas', 
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: ''
  },
  { 
    title: 'Episode V - The Empire Strikes Back', 
    episode_id: 2, 
    opening_crawl: '...', 
    director: 'Irvin Kershner', 
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1980-05-17',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: ''
  },
  { 
    title: 'Episode VI - Return of the Jedi', 
    episode_id: 3, 
    opening_crawl: '...', 
    director: 'Richard Marquand', 
    producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
    release_date: '1983-05-25',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: ''
  },
];

describe('filmsSlice', () => {
  test('should handle initial state', () => {
    expect(filmsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setFilms', () => {
    const actual = filmsReducer(initialState, setFilms(filmsData));
    expect(actual.films).toEqual(filmsData);
    expect(actual.filteredFilms).toEqual(filmsData);
  });

  test('should handle filterFilms', () => {
    const stateWithFilms = { ...initialState, films: filmsData, filteredFilms: filmsData };
    const actual = filmsReducer(stateWithFilms, filterFilms('A New Hope'));
    expect(actual.filteredFilms).toEqual([filmsData[0]]);
  });

  test('should handle selectFilm', () => {
    const actual = filmsReducer(initialState, selectFilm(filmsData[0]));
    expect(actual.selectedFilm).toEqual(filmsData[0]);
  });

  test('should handle sortFilms by title', () => {
    const stateWithFilms = { ...initialState, films: filmsData, filteredFilms: filmsData };
    const actual = filmsReducer(stateWithFilms, sortFilms('title'));
    expect(actual.filteredFilms[0].title).toEqual('Episode IV - A New Hope');
  });

  test('should handle
