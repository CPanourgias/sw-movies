import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

interface SortDropdownProps {
  onSortChange: (sortKey: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const sortKey = useSelector((state: RootState) => state.films.sortKey);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="m-4">
      <select
        value={sortKey}
        onChange={handleChange}
        className="p-2 text-base border border-solid border-[#ccc] rounded-lg"
      >
        <option value="title">Title</option>
        <option value="releaseDate">Release Date</option>
      </select>
    </div>
  );
};

export default SortDropdown;
