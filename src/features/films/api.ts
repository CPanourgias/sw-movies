import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Film, FilmDetails } from '../../types';

interface FilmsResponse {
  results: Film[];
}

const EPISODES = ['I', 'II', 'III', 'IV', 'V', 'VI'];

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
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=star+wars+episode+${EPISODES[episode_id - 1]}`,
      providesTags: (_result, _error, episode_id) => [
        { type: 'FilmDetails', id: episode_id },
      ],
    }),
  }),
});

export const { useGetFilmsQuery, useGetFilmDetailsQuery } = filmsApi;
