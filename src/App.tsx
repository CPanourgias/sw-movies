// src/App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import FilmList from './components/FilmList/FilmList';
import FilmDetails from './components/FilmList/FilmDetails';
import SearchBar from './components/SearchBar/SearchBar';
import SortDropdown from './components/SortDropdown/SortDropdown';
import store from './store';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from './store/slices/filmsSlice';

const filmsData = [
  {
    id: 1,
    title: 'Episode IV - A New Hope',
    releaseDate: '1977-05-25',
    description: 'Description for A New Hope',
    director: 'George Lucas',
  },
  {
    id: 2,
    title: 'Episode V - The Empire Strikes Back',
    releaseDate: '1980-05-17',
    description: 'Description for The Empire Strikes Back',
    director: 'Irvin Kershner',
  },
  {
    id: 3,
    title: 'Episode VI - Return of the Jedi',
    releaseDate: '1983-05-25',
    description: 'Description for Return of the Jedi',
    director: 'Richard Marquand',
  },
  // Add more films as needed
];

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredFilms, selectedFilm } = useAppSelector(
    (state) => state.films
  );

  useEffect(() => {
    dispatch(setFilms(filmsData));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(filterFilms(query));
  };

  const handleSortChange = (sortKey: string) => {
    dispatch(sortFilms(sortKey));
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchBar onSearch={handleSearch} />
        <SortDropdown onSortChange={handleSortChange} />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <FilmList
            films={filteredFilms}
            onFilmSelect={(film) => dispatch(selectFilm(film))}
          />
        </div>
        <div style={{ flex: 2 }}>
          <FilmDetails film={selectedFilm} />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
