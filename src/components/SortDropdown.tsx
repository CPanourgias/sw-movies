import { useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import type { RootState } from '../app/store';
interface SortDropdownProps {
  onSortChange: (sortKey: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const sortKey = useSelector((state: RootState) => state.films.sortKey);

  const handleChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-select-label">Sort</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={sortKey}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="releaseDate">Release Date</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
