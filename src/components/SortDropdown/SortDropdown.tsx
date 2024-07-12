// src/components/SortDropdown/SortDropdown.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './SortDropdown.module.css';

interface SortDropdownProps {
  onSortChange: (sortKey: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const sortKey = useSelector((state: RootState) => state.films.sortKey);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className={styles.sortDropdown}>
      <select value={sortKey} onChange={handleChange}>
        <option value="title">Title</option>
        <option value="releaseDate">Release Date</option>
      </select>
    </div>
  );
};

export default SortDropdown;
