import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';

import type { Film } from '../types';
import { useGetFilmDetailsQuery } from '../features/films/api';
import { useNormalizeRating } from '../hooks/useNormalizeRating';

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

    const { Poster, BoxOffice, Runtime, Ratings } = data;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <img
            className="shadow-lg h-full size-72 sm:mb-4"
            src={Poster}
            alt="new"
          />
        </Grid>
        <Grid item xs={12} sm={8} textAlign="left">
          <Typography>{film.opening_crawl}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          textAlign="left"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start',
            textAlign: 'start',
          }}
        >
          <Typography>
            <b>Director:</b> {film.director}
          </Typography>
          <Typography>
            <b>Box Office:</b> {BoxOffice}
          </Typography>
          <Typography>
            <b>Runtime:</b> {Runtime}
          </Typography>
          <Typography display="flex">
            <b>Avg. Rating: </b>
            <Rating
              name="read-only"
              value={calculateAverageRating(
                Ratings.map((d: { Source: string; Value: string }) => d.Value),
              )}
              readOnly
              precision={0.5}
              max={10}
            />
          </Typography>
          <div>
            <div className="flex gap-4">
              {Ratings.map(
                (r: { Source: string; Value: string }, i: number) => (
                  <Chip
                    key={r.Source}
                    avatar={
                      <Avatar alt="DB icon" src={`/icons/${icons[i]}.svg`} />
                    }
                    label={r.Value}
                    variant="outlined"
                  />
                ),
              )}
            </div>
          </div>
        </Grid>
      </Grid>
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
