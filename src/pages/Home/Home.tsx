// src/pages/Home/Home.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import FilmList from '../../components/FilmList/FilmList';
import FilmDetails from '../../components/FilmList/FilmDetails';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from '../../features/films/filmsSlice';
import {
  selectFilteredFilms,
  selectSelectedFilm,
} from '../../features/films/filmsSelectors';
import styles from './Home.module.css';

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

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const filteredFilms = useSelector(selectFilteredFilms);
  const selectedFilm = useSelector(selectSelectedFilm);

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
    <div className={styles.home}>
      <Header />
      <div className={styles.controls}>
        <SearchBar onSearch={handleSearch} />
        <SortDropdown onSortChange={handleSortChange} />
      </div>
      <div className={styles.content}>
        <div className={styles.filmList}>
          <FilmList
            films={filteredFilms}
            onFilmSelect={(film) => dispatch(selectFilm(film))}
          />
        </div>
        <div className={styles.filmDetails}>
          <FilmDetails film={selectedFilm} />
        </div>
      </div>
    </div>
  );
};

export default Home;
