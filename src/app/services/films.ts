import { api } from './api';

export type FilmsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

export type Rating = {
  Source: string;
  Value: string;
};

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
};

export const moviesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilms: build.query<FilmsResponse, void>({
      query: () => ({ url: 'films/?format=json' }),
      providesTags: () => [{ type: 'Films' }],
    }),
  }),
});

export const { useGetFilmsQuery } = moviesApi;

export const {
  endpoints: { getFilms },
} = moviesApi;
