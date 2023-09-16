import { useState } from 'react';
import css from './searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = e => {
    setInputValue(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    onSubmit(inputValue.trim());
    setInputValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={css.SearchFormButton}>
          Search
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
};
