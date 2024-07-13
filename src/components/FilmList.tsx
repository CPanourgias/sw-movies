import { Divider, List, ListItemText } from '@mui/material';
import { format, parseISO } from 'date-fns';

import type { Film } from '../types';
interface FilmListProps {
  films: Film[];
  onFilmSelect: (film: Film) => void;
}

const FilmList: React.FC<FilmListProps> = ({ films, onFilmSelect }) => {
  return (
    <List>
      {films.map((film) => {
        const { episode_id, title, release_date } = film;

        return (
          <>
            <ListItemText
              onClick={() => onFilmSelect(film)}
              className="hover:cursor-pointer py-4"
            >{`Episode ${episode_id} -  ${title} - ${format(parseISO(release_date), 'PP')}`}</ListItemText>
            <Divider variant="fullWidth" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default FilmList;
