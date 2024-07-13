import type { Film, FilmDetails } from '../types';

export const mockFilms: Film[] = [
  {
    title: 'A New Hope',
    episode_id: 4,
    release_date: '1977-05-25',
    director: 'George Lucas',
    opening_crawl: '',
  },
  {
    title: 'The Empire Strikes Back',
    episode_id: 5,
    release_date: '1980-05-21',
    director: 'Irvin Kershner',
    opening_crawl: '',
  },
];

export const mockFilmDetails: FilmDetails = {
  Title: 'Star Wars: Episode I - The Phantom Menace',
  Runtime: '136 min',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNzQzOTk3NjAtZjZmNC00ZDJhLWJmNDAtYTM2N2M1N2FjMjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '6.5/10' },
    { Source: 'Rotten Tomatoes', Value: '51%' },
    { Source: 'Metacritic', Value: '51/100' },
  ],
  BoxOffice: 'N/A',
};
