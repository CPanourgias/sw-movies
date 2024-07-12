import type { Film } from 'features/films/filmsApi';
interface FilmListItemProps {
  film: Film;
  onFilmSelect: (film: Film) => void;
}

const FilmListItem: React.FC<FilmListItemProps> = ({ film, onFilmSelect }) => {
  return (
    <div
      className="p-4 border-b border-solid border-white hover:bg-[#f0f0f0]"
      onClick={() => onFilmSelect(film)}
    >
      {film.title} ({new Date(film.release_date).getFullYear()})
    </div>
  );
};

export default FilmListItem;
