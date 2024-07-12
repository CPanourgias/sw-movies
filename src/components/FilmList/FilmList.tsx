import React from 'react';
import FilmListItem from './FilmListItem';
import styles from './FilmList.module.css';

interface Film {
  id: number;
  title: string;
  releaseDate: string;
  description: string;
  director: string;
}

interface FilmListProps {
  films: Film[];
  onFilmSelect: (film: Film) => void;
}

const FilmList: React.FC<FilmListProps> = ({ films, onFilmSelect }) => {
  return (
    <div className={styles.filmList}>
      {films.map((film) => (
        <FilmListItem key={film.id} film={film} onFilmSelect={onFilmSelect} />
      ))}
    </div>
  );
};

export default FilmList;
