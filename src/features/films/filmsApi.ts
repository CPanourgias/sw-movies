import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface FilmsResponse {
  results: Film[];
}

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getFilms: builder.query<FilmsResponse, void>({
      query: () => 'films/?format=json',
    }),
  }),
});

export const { useGetFilmsQuery } = filmsApi;
