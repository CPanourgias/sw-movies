import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Rating,
  Typography,
} from '@mui/material';

import type { Film } from '../types';
import { useGetFilmDetailsQuery } from '../features/films/api';
import useNormalizeRating from '../hooks/useNormalizeRating';

interface FilmDetailsProps {
  film: Film;
}

const icons = ['imdb', 'rotten-tomatoes', 'metascore'];

const FilmSideBar: React.FC<FilmDetailsProps> = ({ film }) => {
  const { calculateAverageRating } = useNormalizeRating();
  const { data, isLoading, error } = useGetFilmDetailsQuery(
    film.episode_id ?? 0,
    { skip: film.episode_id === null },
  );

  const renderCardContent = () => {
    if (isLoading) {
      return (
        <>
          <CircularProgress />
          <Typography>Details are loading</Typography>
        </>
      );
    }

    if (error || !data) {
      return (
        <Typography>
          There seems to be an error. Try selecting another film or refresh the
          page
        </Typography>
      );
    }

    return (
      <Box display="flex" columnGap={2}>
        <img
          className="shadow-lg h-full size-72 sm:mb-4"
          src={data.Poster}
          alt="new"
        />
        <div className="flex flex-col text-left gap-2">
          <Typography>{film.opening_crawl}</Typography>
          <Typography>
            <b>Director:</b> {film.director}
          </Typography>
          <Typography>
            <b>Box Office:</b> {data.BoxOffice}
          </Typography>
          <Typography>
            <b>Runtime:</b> {data.Runtime}
          </Typography>
          <Typography display="flex">
            <b>Avg. Rating: </b>
            <Rating
              name="read-only"
              value={calculateAverageRating(data.Ratings.map((d) => d.Value))}
              readOnly
              precision={0.5}
              max={10}
            />
          </Typography>

          <div>
            <div className="flex gap-4">
              {data.Ratings.map((r, i) => (
                <Chip
                  key={r.Source}
                  avatar={
                    <Avatar alt="DB icon" src={`/icons/${icons[i]}.svg`} />
                  }
                  label={r.Value}
                  variant="outlined"
                />
              ))}
            </div>
          </div>
        </div>
      </Box>
    );
  };

  return (
    <Card className="h-full text-center">
      <CardHeader title={film.title}>
        <Divider variant="fullWidth" component="div" sx={{ marginBottom: 4 }} />
      </CardHeader>
      <CardContent>{renderCardContent()}</CardContent>
    </Card>
  );
};

export default FilmSideBar;
