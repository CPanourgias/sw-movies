import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Chip,
  Avatar,
} from '@mui/material';
import type { Film, FilmDetails } from '../types';

interface FilmDetailsProps {
  film: Film | null;
  isLoadingDetails: boolean;
  details: FilmDetails | undefined;
}

const FilmSideBar: React.FC<FilmDetailsProps> = (props) => {
  const { film, isLoadingDetails, details } = props;
  if (!film) {
    return (
      <Card>
        <CardContent>Select a film to see the details.</CardContent>
      </Card>
    );
  }

  if (!details) {
    return (
      <Card>
        <CardContent>
          No details found! Select a different film, or refresh the page.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader title={film.title} />
      <CardContent className="flex">
        <img className="shadow-lg h-full" src={details.Poster} alt="new" />
        <Box className="flex flex-col gap-4 p-2">
          <Typography variant="body1">{film.opening_crawl}</Typography>
          <Typography variant="body1">
            <b>Director:</b> {film.director}
          </Typography>
          <Typography variant="body1">
            <b>Box Office:</b> {details.BoxOffice}
          </Typography>
          <Typography variant="body1">
            <b>Runtime:</b> {details.Runtime}
          </Typography>
          <div>
            <Typography variant="body1">Ratings</Typography>
            <div className="flex gap-4">
              <Chip
                avatar={<Avatar alt="Natacha" src="/icons/imdb.svg" />}
                label={details.Ratings[0].Value}
                variant="outlined"
              />
              <Chip
                avatar={
                  <Avatar alt="Natacha" src="/icons/rotten-tomatoes.svg" />
                }
                label={details.Ratings[1].Value}
                variant="outlined"
              />
              <Chip
                avatar={<Avatar alt="Natacha" src="/icons/metascore.svg" />}
                label={details.Ratings[2].Value}
                variant="outlined"
              />
            </div>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilmSideBar;
