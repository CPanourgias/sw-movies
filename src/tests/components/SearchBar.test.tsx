// tests/components/SearchBar.test.tsx
import { render, fireEvent } from '@testing-library/react';
import SearchBar from 'components/SearchBar/SearchBar';

test('renders SearchBar component and performs search', () => {
  const handleSearch = jest.fn();
  const { getByPlaceholderText } = render(
    <SearchBar onSearch={handleSearch} />,
  );
  const input = getByPlaceholderText('Search films...');

  fireEvent.change(input, { target: { value: 'A New Hope' } });
  expect(handleSearch).toHaveBeenCalledWith('A New Hope');
});
