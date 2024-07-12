import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../../../src/pages/Home/Home';
import { setFilms } from '../../../src/features/films/filmsSlice';

const mockStore = configureStore([]);
const store = mockStore({
  films: {
    films: [],
    filteredFilms: [],
    selectedFilm: null,
  },
});

describe('Home', () => {
  beforeEach(() => {
    store.clearActions();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  test('renders Header component', () => {
    expect(screen.getByText('Star Wars Movies')).toBeInTheDocument();
  });

  test('renders SearchBar component', () => {
    expect(screen.getByPlaceholderText('Search films...')).toBeInTheDocument();
  });

  test('renders SortDropdown component', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('dispatches setFilms action on mount', () => {
    const actions = store.getActions();
    expect(actions).toContainEqual(setFilms(expect.any(Array)));
  });

  test('renders FilmList and FilmDetails components', () => {
    expect(
      screen.getByText('Select a film to see the details.')
    ).toBeInTheDocument();
  });

  test('filters films based on search query', () => {
    const input = screen.getByPlaceholderText('Search films...');
    fireEvent.change(input, { target: { value: 'A New Hope' } });
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'films/filterFilms',
      payload: 'A New Hope',
    });
  });

  test('sorts films based on selected option', () => {
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'releaseDate' } });
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'films/sortFilms',
      payload: 'releaseDate',
    });
  });
});
