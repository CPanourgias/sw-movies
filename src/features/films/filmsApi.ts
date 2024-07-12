import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

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

export interface FilmDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface FilmsResponse {
  results: Film[];
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://swapi.dev/api/',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Films'],
  endpoints: (builder) => ({
    getFilms: builder.query<FilmsResponse, void>({
      query: () => 'films/?format=json',
    }),
    getFilmDetails: builder.query<FilmDetails, void>({
      query: (episode_id) =>
        `https://www.omdbapi.com/?apikey=b9a5e69d&t=star+wars+episode+${episode_id}`,
    }),
  }),
});

export const { useGetFilmsQuery, useGetFilmDetailsQuery } = filmsApi;
