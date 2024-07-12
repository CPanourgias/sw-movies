import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import SortDropdown from './SortDropdown';
import { renderWithProviders } from '../utils/renderWithProvider';

describe('SortDropdown', () => {
  it('calls onSortChange when the sort option changes', () => {
    const onSortChange = vi.fn();
    renderWithProviders(<SortDropdown onSortChange={onSortChange} />);
    const dropdown = screen.getByRole('combobox');

    fireEvent.change(dropdown, { target: { value: 'title' } });
    expect(onSortChange).toHaveBeenCalledWith('title');
  });
});
