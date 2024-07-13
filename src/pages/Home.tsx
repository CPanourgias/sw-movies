import { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { RootState, useAppDispatch, useTypedSelector } from '../app/store';
import {
  Header,
  FilmList,
  FilmDetails,
  SearchBar,
  SortDropdown,
} from '../components';
import { setFilms } from '../features/films/slice';
import { useGetFilmsQuery } from '../features/films/api';
import type { Film } from '../types';
import { isNull } from 'lodash';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetFilmsQuery();

  const filteredFilms = useTypedSelector(
    (state: RootState) => state.films.filteredFilms,
  );

  const selectedFilm = useTypedSelector(
    (state: RootState) => state.films.selectedFilm,
  );

  useEffect(() => {
    if (data) {
      const filmsData: Film[] = data.results;
      dispatch(setFilms(filmsData));
    }
  }, [data, dispatch]);

  const renderFilms = () => {
    if (isLoading) {
      return (
        <Grid item xs={6}>
          <CircularProgress />
        </Grid>
      );
    }

    if (error || !data) {
      return (
        <Typography textAlign="center">
          There was an error loading data, please refresh the page
        </Typography>
      );
    }

    return (
      <>
        <Grid item xs={12} md={5}>
          <FilmList films={filteredFilms} />
        </Grid>
        <Grid item xs={12} md={7}>
          {isNull(selectedFilm) ? (
            <Typography textAlign="center">
              Select a movie from the list to see extra details
            </Typography>
          ) : (
            <FilmDetails film={selectedFilm} />
          )}
        </Grid>
      </>
    );
  };

  return (
    <>
      <Header />
      <Grid container spacing={4} className="mb-16">
        <Grid item xs={12} md={9}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} md={3}>
          <SortDropdown />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {renderFilms()}
      </Grid>
    </>
  );
};

export default Home;
