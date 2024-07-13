import { Box, TextField } from '@mui/material';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <Box sx={{ width: '100%' }} display="flex" flexDirection="row">
      <TextField
        value={query}
        onChange={handleChange}
        label="Search films..."
        variant="outlined"
        sx={{ flex: 4 }}
      />
    </Box>
  );
};

export default SearchBar;
