import { render } from '@testing-library/react';

import Header from 'components/Header';

test('renders Header component', () => {
  const { getByText } = render(<Header />);
  expect(getByText('Star Wars Movies')).toBeInTheDocument();
});
