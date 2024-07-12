import React from 'react';
import styles from './FilmListItem.module.css';

interface Film {
  id: number;
  title: string;
  releaseDate: string;
  description: string;
  director: string;
}

interface FilmListItemProps {
  film: Film;
  onFilmSelect: (film: Film) => void;
}

const FilmListItem: React.FC<FilmListItemProps> = ({ film, onFilmSelect }) => {
  return (
    <div className={styles.filmListItem} onClick={() => onFilmSelect(film)}>
      {film.title} ({new Date(film.releaseDate).getFullYear()})
    </div>
  );
};

export default FilmListItem;
