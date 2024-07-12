import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilmListItem from './FilmListItem';
import { Film } from '../types';

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

describe('FilmListItem', () => {
  it('renders film item correctly and handles click event', () => {
    const onFilmSelect = vi.fn();
    render(<FilmListItem film={film} onFilmSelect={onFilmSelect} />);
    const filmTitleElement = screen.getByText(/A New Hope/i);
    expect(filmTitleElement).toBeInTheDocument();
    fireEvent.click(filmTitleElement);
    expect(onFilmSelect).toHaveBeenCalledWith(film);
  });
});
