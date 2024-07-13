import { http, HttpResponse } from 'msw';
import { mockFilmDetails, mockFilms } from './mocks';

export const handlers = [
  http.get('https://swapi.dev/api/films/?format=json', () => {
    return HttpResponse.json({
      count: 2,
      next: null,
      previous: null,
      results: mockFilms,
    });
  }),
  http.get(
    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=star+wars+episode+I`,
    () => {
      return HttpResponse.json(mockFilmDetails);
    },
  ),
];
