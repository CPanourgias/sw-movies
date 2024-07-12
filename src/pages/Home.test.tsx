import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { renderWithProviders } from '../utils/renderWithProvider';
import Home from './Home';

describe('Home', () => {
  it('renders Home page correctly', () => {
    renderWithProviders(<Home />);
    const headerElement = screen.getByText(/Star Wars Movies/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('filters films based on search input', () => {
    renderWithProviders(<Home />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(searchInput, { target: { value: 'hope' } });
    const filmTitleElement = screen.getByText(/A New Hope/i);
    expect(filmTitleElement).toBeInTheDocument();
  });

  it('sorts films based on dropdown selection', () => {
    renderWithProviders(<Home />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'title' } });
    const filmTitleElement = screen.getByText(/A New Hope/i);
    expect(filmTitleElement).toBeInTheDocument();
  });
});
