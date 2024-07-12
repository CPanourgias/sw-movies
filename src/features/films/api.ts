import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Film, FilmDetails } from '../../types';

interface FilmsResponse {
  results: Film[];
}

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  tagTypes: ['Films', 'FilmDetails'],
  endpoints: (builder) => ({
    getFilms: builder.query<FilmsResponse, void>({
      query: () => 'films/?format=json',
      providesTags: (result) =>
        result
          ? result.results.map(({ episode_id }) => ({
              type: 'Films',
              id: episode_id,
            }))
          : [],
    }),
    getFilmDetails: builder.query<FilmDetails, number>({
      query: (episode_id) =>
        `https://www.omdbapi.com/?apikey=b9a5e69d&t=star+wars+episode+${episode_id}`,
      providesTags: (_result, _error, episode_id) => [
        { type: 'FilmDetails', id: episode_id },
      ],
    }),
  }),
});

export const { useGetFilmsQuery, useGetFilmDetailsQuery } = filmsApi;
