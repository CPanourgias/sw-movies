// src/components/FilmDetails/FilmDetails.tsx
import React from 'react';

import type { Film, FilmDetails } from 'features/films/filmsApi';

interface FilmDetailsProps {
  film: Film | null;
  details: FilmDetails | null; // Change this to the appropriate type
}

const FilmDetails: React.FC<FilmDetailsProps> = ({ film, details }) => {
  if (!film) {
    return (
      <div className="p-4 border-l border-solid border-white">
        Select a film to see the details.
      </div>
    );
  }

  return (
    <div className="p-4 border-l border-solid border-white">
      <h2>{film.title}</h2>
      <p>
        <strong>Release Date:</strong>{' '}
        {new Date(film.release_date).toDateString()}
      </p>
      <p>
        <strong>Director:</strong> {film.director}
      </p>
      <p>{film.opening_crawl}</p>
      {details && (
        <>
          <h3>Additional Details</h3>
          <p>
            <strong>Genre:</strong> {details.Genre}
          </p>
          <p>
            <strong>Actors:</strong> {details.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {details.Plot}
          </p>
          <p>
            <strong>IMDb Rating:</strong> {details.imdbRating}
          </p>
        </>
      )}
    </div>
  );
};

export default FilmDetails;
