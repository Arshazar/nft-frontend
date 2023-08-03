import { ChangeEvent } from 'react';

import s from './SearchBar.module.css';
import { SearchBarProps } from '@/types/componentsTypes';

const SearchBar = ({ text, setText }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <div className={s['input-wrapper']}>
      <input
        aria-label="Search"
        type="search"
        placeholder="Search nft name"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export { SearchBar };
