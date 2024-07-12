import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '.';

describe('Header', () => {
  it('renders the header correctly', () => {
    render(<Header />);
    const headerElement = screen.getByText(/Star Wars Movies/i);
    expect(headerElement).toBeInTheDocument();
  });
});
