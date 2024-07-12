import React from 'react';
import FilmListItem from './FilmListItem';
import styles from './FilmList.module.css';
import type { Film } from 'features/films/filmsApi';

interface FilmListProps {
  films: Film[];
  onFilmSelect: (film: Film) => void;
}

const FilmList: React.FC<FilmListProps> = ({ films, onFilmSelect }) => {
  return (
    <div className={styles.filmList}>
      {films.map((film) => (
        <FilmListItem
          key={film.episode_id}
          film={film}
          onFilmSelect={onFilmSelect}
        />
      ))}
    </div>
  );
};

export default FilmList;
