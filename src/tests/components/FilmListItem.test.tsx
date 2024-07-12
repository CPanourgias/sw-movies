import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import FilmListItem from '../../components/FilmList/FilmListItem';

const film = {
  id: 1,
  title: 'Episode IV - A New Hope',
  releaseDate: '1977-05-25',
  description: 'Description for A New Hope',
  director: 'George Lucas',
};

test('renders FilmListItem component', () => {
  const { getByText } = render(
    <FilmListItem film={film} onFilmSelect={() => {}} />
  );
  expect(getByText('Episode IV - A New Hope (1977)')).toBeInTheDocument();
});
