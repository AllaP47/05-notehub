import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={onChange}
    />
  );
};
