export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  release_date: string;
}

export interface FilmDetails {
  Title: string;
  Runtime: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  BoxOffice: string;
}
