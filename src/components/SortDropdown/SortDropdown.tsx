import React from 'react';
import styles from './SortDropdown.module.css';

interface SortDropdownProps {
  onSortChange: (sortKey: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className={styles.sortDropdown}>
      <select onChange={handleChange}>
        <option value="title">Title</option>
        <option value="releaseDate">Release Date</option>
      </select>
    </div>
  );
};

export default SortDropdown;
