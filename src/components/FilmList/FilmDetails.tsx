// src/components/FilmDetails/FilmDetails.tsx
import React from 'react';
import styles from './FilmDetails.module.css';

import type { Film } from 'features/films/filmsApi';

interface FilmDetailsProps {
  film: Film | null;
}

const FilmDetails: React.FC<FilmDetailsProps> = ({ film }) => {
  if (!film) {
    return (
      <div className={styles.filmDetails}>
        Select a film to see the details.
      </div>
    );
  }

  return (
    <div className={styles.filmDetails}>
      <h2>{film.title}</h2>
      <p>
        <strong>Release Date:</strong>{' '}
        {new Date(film.release_date).toDateString()}
      </p>
      <p>
        <strong>Director:</strong> {film.director}
      </p>
      <p>{film.opening_crawl}</p>
    </div>
  );
};

export default FilmDetails;
