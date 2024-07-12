import FilmListItem from './FilmListItem';
import type { Film } from '../types';

interface FilmListProps {
  films: Film[];
  onFilmSelect: (film: Film) => void;
}

const FilmList: React.FC<FilmListProps> = ({ films, onFilmSelect }) => {
  return (
    <div className="flex flex-col w-full">
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
