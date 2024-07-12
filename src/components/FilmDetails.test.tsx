import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import FilmDetails from './FilmDetails';
import { Film, FilmDetails as FilmDetailsType } from '../types';

const film: Film = {
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl: '',
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
  url: '',
};

const details: FilmDetailsType = {
  Title: 'A New Hope',
  Year: '1977',
  Rated: 'PG',
  Released: '25 May 1977',
  Runtime: '121 min',
  Genre: 'Action, Adventure, Fantasy',
  Director: 'George Lucas',
  Writer: 'George Lucas',
  Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
  Plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
  Language: 'English',
  Country: 'USA',
  Awards: 'Won 6 Oscars. Another 50 wins & 28 nominations.',
  Poster: 'https://m.media-amazon.com/images/I/81j9C+WgvQL._AC_SY679_.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.6/10' },
    { Source: 'Rotten Tomatoes', Value: '92%' },
    { Source: 'Metacritic', Value: '90/100' },
  ],
  Metascore: '90',
  imdbRating: '8.6',
  imdbVotes: '1,234,567',
  imdbID: 'tt0076759',
  Type: 'movie',
  DVD: '21 Sep 2004',
  BoxOffice: '$460,998,507',
  Production: 'Lucasfilm Ltd.',
  Website: 'N/A',
  Response: 'True',
};

describe('FilmDetails', () => {
  it('renders film details correctly', () => {
    render(<FilmDetails film={film} details={details} />);
    const filmTitleElement = screen.getByText(/A New Hope/i);
    expect(filmTitleElement).toBeInTheDocument();
    const filmDirectorElement = screen.getByText(/George Lucas/i);
    expect(filmDirectorElement).toBeInTheDocument();
  });
});
