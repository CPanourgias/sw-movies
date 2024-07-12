// tests/components/SortDropdown.test.tsx
import { render, fireEvent } from '@testing-library/react';
import SortDropdown from 'components/SortDropdown/SortDropdown';

test('renders SortDropdown component and performs sort change', () => {
  const handleSortChange = jest.fn();
  const { getByRole } = render(
    <SortDropdown onSortChange={handleSortChange} />
  );
  const select = getByRole('combobox');

  fireEvent.change(select, { target: { value: 'releaseDate' } });
  expect(handleSortChange).toHaveBeenCalledWith('releaseDate');
});
