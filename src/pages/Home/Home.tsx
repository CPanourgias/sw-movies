// src/pages/Home/Home.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from '../../store';
import {
  FilmList,
  FilmDetails,
  SearchBar,
  SortDropdown,
  Header,
} from '../../components';
import {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
  fetchFilmDetails,
} from '../../features/films/filmsSlice';
import { useGetFilmsQuery, Film } from '../../features/films/filmsApi';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetFilmsQuery();
  const filteredFilms = useTypedSelector((state) => state.films.filteredFilms);
  const selectedFilm = useTypedSelector((state) => state.films.selectedFilm);
  const selectedFilmDetails = useTypedSelector(
    (state) => state.films.selectedFilmDetails,
  );
  const loadingFilmDetails = useTypedSelector(
    (state) => state.films.loadingFilmDetails,
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

  const handleFilmSelect = (film: Film) => {
    dispatch(selectFilm(film));
    if (film.episode_id) {
      dispatch(fetchFilmDetails(film.episode_id));
    }
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
          <FilmList films={filteredFilms} onFilmSelect={handleFilmSelect} />
        </div>
        <div className={styles.filmDetails}>
          {loadingFilmDetails ? (
            <div>Loading details...</div>
          ) : (
            <FilmDetails film={selectedFilm} details={selectedFilmDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
