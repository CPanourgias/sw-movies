import { Divider, List, ListItemText } from '@mui/material';
import { format, parseISO } from 'date-fns';

import type { Film } from '../types';
import { RootState, useAppDispatch, useTypedSelector } from '../app/store';
import { selectFilm } from '../features/films/slice';
import { isNull } from 'lodash';
interface FilmListProps {
  films: Film[];
}

const FilmList: React.FC<FilmListProps> = ({ films }) => {
  const dispatch = useAppDispatch();

  const selectedFilm = useTypedSelector(
    (state: RootState) => state.films.selectedFilm,
  );

  const handleFilmSelect = (film: Film) => {
    if (!isNull(selectedFilm) && film.episode_id === selectedFilm.episode_id) {
      dispatch(selectFilm(null));
      return;
    }
    dispatch(selectFilm(film));
  };

  return (
    <List>
      <Divider variant="fullWidth" component="li" />
      {films.map((film) => {
        const { episode_id, title, release_date } = film;

        return (
          <div key={episode_id}>
            <ListItemText
              onClick={() => handleFilmSelect(film)}
              className="hover:cursor-pointer py-4 px-2 hover:bg-zinc-700"
            >
              {`Episode ${episode_id} -  ${title} - ${format(parseISO(release_date), 'PP')}`}
            </ListItemText>
            <Divider variant="fullWidth" component="li" />
          </div>
        );
      })}
    </List>
  );
};

export default FilmList;
