import { useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { useAppDispatch, type RootState } from '../app/store';
import { sortFilms } from '../features/films/slice';

const SortDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortKey = useSelector((state: RootState) => state.films.sortKey);

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(sortFilms(e.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-select-label">Sort by</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={sortKey}
        label="Sort by"
        onChange={handleChange}
      >
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="releaseDate">Release Date</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
