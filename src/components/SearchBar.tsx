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
    <div className="m-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search films..."
        className="w-full p-2 text-base border border-solid border-[#ccc] rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
