import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api/films/?format=json', () => {
    return HttpResponse.json({
      count: 2,
      next: null,
      previous: null,
      results: [
        { episode_id: 1, title: 'The Phantom Menace' },
        { episode_id: 2, title: 'Attack of the Clones' },
      ],
    });
  }),
];
