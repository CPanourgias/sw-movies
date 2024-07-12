import filmsReducer, {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from './slice';
import type { Film } from '../../types';
import { describe, it, expect } from 'vitest';

describe('filmsSlice', () => {
  const initialState = {
    films: [],
    filteredFilms: [],
    selectedFilm: null,
    selectedFilmDetails: null,
    loadingFilmDetails: false,
    filmDetailsCache: {},
    sortKey: 'releaseDate',
  };

  it('should handle initial state', () => {
    expect(filmsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setting films', () => {
    const films: Film[] = [
      {
        title: 'A New Hope',
        episode_id: 4,
        release_date: '1977-05-25',
        director: 'George Lucas',
        opening_crawl: '',
        producer: '',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '',
        edited: '',
        url: '',
      },
    ];
    const actual = filmsReducer(initialState, setFilms(films));
    expect(actual.films).toEqual(films);
    expect(actual.filteredFilms).toEqual(films);
  });

  it('should handle filtering films', () => {
    const films: Film[] = [
      {
        title: 'A New Hope',
        episode_id: 4,
        release_date: '1977-05-25',
        director: 'George Lucas',
        opening_crawl: '',
        producer: '',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '',
        edited: '',
        url: '',
      },
      {
        title: 'The Empire Strikes Back',
        episode_id: 5,
        release_date: '1980-05-21',
        director: 'Irvin Kershner',
        opening_crawl: '',
        producer: '',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '',
        edited: '',
        url: '',
      },
    ];
    const stateWithFilms = { ...initialState, films, filteredFilms: films };
    const actual = filmsReducer(stateWithFilms, filterFilms('hope'));
    expect(actual.filteredFilms).toEqual([films[0]]);
  });

  it('should handle selecting a film', () => {
    const film: Film = {
      title: 'A New Hope',
      episode_id: 4,
      release_date: '1977-05-25',
      director: 'George Lucas',
      opening_crawl: '',
      producer: '',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: '',
      edited: '',
      url: '',
    };
    const actual = filmsReducer(initialState, selectFilm(film));
    expect(actual.selectedFilm).toEqual(film);
  });

  it('should handle sorting films by title', () => {
    const films: Film[] = [
      {
        title: 'The Empire Strikes Back',
        episode_id: 5,
        release_date: '1980-05-21',
        director: 'Irvin Kershner',
        opening_crawl: '',
        producer: '',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '',
        edited: '',
        url: '',
      },
      {
        title: 'A New Hope',
        episode_id: 4,
        release_date: '1977-05-25',
        director: 'George Lucas',
        opening_crawl: '',
        producer: '',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '',
        edited: '',
        url: '',
      },
    ];
    const stateWithFilms = { ...initialState, films, filteredFilms: films };
    const actual = filmsReducer(stateWithFilms, sortFilms('title'));
    expect(actual.filteredFilms[0].title).toBe('A New Hope');
  });
});
