import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('calls onSearch when the search input changes', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(searchInput, { target: { value: 'Jedi' } });
    expect(onSearch).toHaveBeenCalledWith('Jedi');
  });
});
