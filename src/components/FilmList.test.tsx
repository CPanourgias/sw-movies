import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilmList from './FilmList';
import { Film } from '../types';

const films: Film[] = [
  {
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
  },
];

describe('FilmList', () => {
  it('renders film list correctly', () => {
    render(<FilmList films={films} onFilmSelect={vi.fn()} />);
    const filmTitleElement = screen.getByText(/A New Hope/i);
    expect(filmTitleElement).toBeInTheDocument();
  });
});
