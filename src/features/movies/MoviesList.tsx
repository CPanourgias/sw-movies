import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchMovies } from './moviesAPI';
import {
  selectMovies,
  selectMoviesLoading,
  selectMoviesError,
} from './moviesSlice';

const MoviesList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const loading = useSelector(selectMoviesLoading);
  const error = useSelector(selectMoviesError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.title}>{movie.title}</li>
      ))}
    </ul>
  );
};

export default MoviesList;
