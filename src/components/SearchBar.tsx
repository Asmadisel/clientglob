import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import '../css/SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Поиск пользователей..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <SearchIcon className="search-icon" />
      </div>
    </div>
  );
};

export default SearchBar;