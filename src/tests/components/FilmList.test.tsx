// tests/components/FilmList.test.tsx
import { render } from '@testing-library/react';

import FilmList from 'components/FilmList/FilmList';

const films = [
  { id: 1, title: 'Episode IV - A New Hope', releaseDate: '1977-05-25' },
  {
    id: 2,
    title: 'Episode V - The Empire Strikes Back',
    releaseDate: '1980-05-17',
  },
];

test('renders FilmList component', () => {
  const { getByText } = render(
    <FilmList films={films} onFilmSelect={() => {}} />
  );
  expect(getByText('Episode IV - A New Hope')).toBeInTheDocument();
  expect(getByText('Episode V - The Empire Strikes Back')).toBeInTheDocument();
});
