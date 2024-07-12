import React from 'react';
import styles from './FilmListItem.module.css';
import type { Film } from 'features/films/filmsApi';
interface FilmListItemProps {
  film: Film;
  onFilmSelect: (film: Film) => void;
}

const FilmListItem: React.FC<FilmListItemProps> = ({ film, onFilmSelect }) => {
  return (
    <div className={styles.filmListItem} onClick={() => onFilmSelect(film)}>
      {film.title} ({new Date(film.release_date).getFullYear()})
    </div>
  );
};

export default FilmListItem;
