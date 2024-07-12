import filmsReducer, {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from '../../../features/films';
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
    const stateWithFilms = {
      ...initialState,
      films: filmsData,
      filteredFilms: filmsData,
    };
    const actual = filmsReducer(stateWithFilms, filterFilms('A New Hope'));
    expect(actual.filteredFilms).toEqual([filmsData[0]]);
  });

  test('should handle selectFilm', () => {
    const actual = filmsReducer(initialState, selectFilm(filmsData[0]));
    expect(actual.selectedFilm).toEqual(filmsData[0]);
  });

  test('should handle sortFilms by title', () => {
    const stateWithFilms = {
      ...initialState,
      films: filmsData,
      filteredFilms: filmsData,
    };
    const actual = filmsReducer(stateWithFilms, sortFilms('title'));
    expect(actual.filteredFilms[0].title).toEqual('Episode IV - A New Hope');
  });

  test('should handle sortFilms by releaseDate', () => {
    const stateWithFilms = {
      ...initialState,
      films: filmsData,
      filteredFilms: filmsData,
    };
    const actual = filmsReducer(stateWithFilms, sortFilms('releaseDate'));
    expect(actual.filteredFilms[0].releaseDate).toEqual('1977-05-25');
  });
});
