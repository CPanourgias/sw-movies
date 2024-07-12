import { test, expect } from 'vitest';
import { render } from '@testing-library/react';

import FilmDetails from '../../components/FilmDetails';

const film = {
  id: 1,
  title: 'Episode IV - A New Hope',
  releaseDate: '1977-05-25',
  description: 'Description for A New Hope',
  director: 'George Lucas',
};

test('renders FilmDetails component with film details', () => {
  const { getByText } = render(<FilmDetails film={film} />);
  expect(getByText('Episode IV - A New Hope')).toBeInTheDocument();
  expect(getByText('Description for A New Hope')).toBeInTheDocument();
  expect(getByText('George Lucas')).toBeInTheDocument();
  expect(getByText('Wed May 25 1977')).toBeInTheDocument();
});

test('renders FilmDetails component without film', () => {
  const { getByText } = render(<FilmDetails film={null} />);
  expect(getByText('Select a film to see the details.')).toBeInTheDocument();
});
