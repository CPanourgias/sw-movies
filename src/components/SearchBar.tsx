import { useState } from 'react';
import { Box, TextField } from '@mui/material';

import { filterFilms, selectFilm } from '../features/films/slice';
import { useAppDispatch } from '../app/store';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(selectFilm(null));
    dispatch(filterFilms(newQuery));
  };

  return (
    <Box sx={{ width: '100%' }} display="flex" flexDirection="row">
      <TextField
        value={query}
        onChange={handleSearch}
        label="Search films..."
        variant="outlined"
        sx={{ flex: 4 }}
      />
    </Box>
  );
};

export default SearchBar;
