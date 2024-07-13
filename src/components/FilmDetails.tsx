// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   CardHeader,
//   Chip,
//   Avatar,
// } from '@mui/material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';

import type { Film } from '../types';
import { useGetFilmDetailsQuery } from '../features/films/api';

interface FilmDetailsProps {
  film: Film;
}

const FilmSideBar: React.FC<FilmDetailsProps> = ({ film }) => {
  const { data, isLoading, error } = useGetFilmDetailsQuery(
    film.episode_id ?? 0,
    { skip: film.episode_id === null },
  );

  const renderCardContent = () => {
    if (isLoading) {
      return (
        <>
          <CircularProgress />
          <Typography variant="body1">Details are loading</Typography>
        </>
      );
    }

    if (error || !data) {
      return (
        <Typography variant="body1">
          There seems to be an error. Try selecting another film or refresh the
          page
        </Typography>
      );
    }

    return (
      <Box display="flex" alignItems="center">
        <div>
          <img className="shadow-lg h-full" src={data.Poster} alt="new" />
          <Typography>{film.opening_crawl}</Typography>
        </div>
      </Box>
    );
  };

  return (
    <Card className="h-full text-center">
      <CardHeader title={film.title} />
      <CardContent>
        <Divider variant="fullWidth" component="div" sx={{ marginBottom: 4 }} />
        {renderCardContent()}
      </CardContent>
    </Card>
  );
};

export default FilmSideBar;
