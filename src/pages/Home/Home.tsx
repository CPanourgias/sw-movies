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
import { useGetFilmsQuery, Film } from '../../features/films/filmsApi';
import styles from './Home.module.css';
import { RootState } from '../../store';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetFilmsQuery();
  const filteredFilms = useSelector((state: RootState) =>
    selectFilteredFilms(state),
  );
  const selectedFilm = useSelector((state: RootState) =>
    selectSelectedFilm(state),
  );

  useEffect(() => {
    if (data) {
      const filmsData: Film[] = data.results;
      dispatch(setFilms(filmsData));
    }
  }, [data, dispatch]);

  const handleSearch = (query: string) => {
    dispatch(filterFilms(query));
  };

  const handleSortChange = (sortKey: string) => {
    dispatch(sortFilms(sortKey));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading films.</div>;
  }

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
